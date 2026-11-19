<?php

namespace App\Controller;
use App\Mapper\ProductOfferMapper;
use App\Entity\Order;
use App\Entity\Offer;
use App\Entity\ProductKey;
use App\Enum\OrderStatus;
use App\Entity\ProductOffer;
use App\Repository\ProductKeyRepository;
use App\Repository\OfferRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;
use Doctrine\DBAL\LockMode;

final class OrdersController extends AbstractController
{
    #[Route('/api/orders', name: 'app_orders', methods: ['GET'])]
    #[IsGranted('ROLE_USER')]
    public function index(EntityManagerInterface $entityManager): JsonResponse
    {
        /** @var User|null $user */
        $user = $this->getUser();

        if (!$user) {
            return $this->json([
                'error' => 'Unauthorized'
            ], 401);
        }

        $orders = $entityManager->getRepository(Order::class)
            ->findBy(
                ['user' => $user->getId()],
                ['date' => 'DESC']
            );

        $result = [];

        foreach ($orders as $order) {
            $result[] = [
                'id' => $order->getId(),
                'price' => $order->getPrice(),
                'date' => $order->getDate()->format(\DateTimeInterface::ATOM),
                'status' => $order->getStatus()->value,
            ];
        }

        return $this->json($result);
    }

    #[Route('/api/orders', name: 'app_orders_create', methods: ['POST'])]
    #[IsGranted('ROLE_USER')]
    public function create(
        Request $request,
        EntityManagerInterface $entityManager,
        OfferRepository $offerRepository,
        ProductKeyRepository $productKeyRepository
    ): JsonResponse {
        /** @var User|null $user */
        $user = $this->getUser();

        if (!$user) {
            return $this->json(['error' => 'Unauthorized'], 401);
        }

        $data = json_decode($request->getContent(), true);

        if (
            !is_array($data) ||
            !isset($data['offerIds']) ||
            !is_array($data['offerIds']) ||
            empty($data['offerIds'])
        ) {
            return $this->json([
                'error' => 'Invalid offer IDs.'
            ], 400);
        }

        $offerIds = array_unique($data['offerIds']);

        foreach ($offerIds as $id) {
            if (!is_int($id) || $id <= 0) {
                return $this->json([
                    'error' => 'Offer IDs must be positive integers.'
                ], 400);
            }
        }
        $offers = $offerRepository->findBy([
            'id' => $offerIds,
        ]);
        if (count($offers) !== count($offerIds)) {
            return $this->json([
                'error' => 'One or more offers do not exist.',
        ], 404);
        }

        $order = new Order();
        $order->setUser($user);
        $order->setDate(new \DateTime()); //DateTimeImmutable
        $order->setStatus(OrderStatus::PENDING);

        $totalPrice = 0;

        foreach ($offers as $offer) {
            if (!$productKeyRepository->hasAvailableByOfferId($offer->getId())) {
                return $this->json([
                    'error' => 'One or more offers do not exist or are already ordered.'
                ], 404);
            }

            $productOffer = new ProductOffer();

            $productOffer->setOffer($offer);
            $productOffer->setOrder($order);

            $order->addProductOffer($productOffer);

            $entityManager->persist($productOffer);

            $totalPrice += (float) $offer->getPrice();
        }

        $order->setPrice(number_format($totalPrice, 2, '.', ''));

        $entityManager->persist($order);
        $entityManager->flush();

        return $this->json([
            'id' => $order->getId(),
            'price' => $order->getPrice(),
            'date' => $order->getDate()->format(\DateTimeInterface::ATOM),
            'status' => $order->getStatus()->value,
        ], 201);
    }
    #[Route('/api/orders/{id}', name: 'app_orders_show', methods: ['GET'])]
    #[IsGranted('ROLE_USER')]
    public function show(int $id,EntityManagerInterface $entityManager,ProductOfferMapper $productOfferMapper): JsonResponse
    {
        $user = $this->getUser();
        $order = $entityManager
            ->getRepository(Order::class)
            ->find($id);
        if (!$user || $order->getUser()->getId() !== $user->getId()) {
            return $this->json([
                'error' => 'Unauthorized'
            ], 401);
        }

        $orders = $entityManager->getRepository(Order::class)
            ->findBy(
                ['user' => $user->getId()],
                ['date' => 'DESC']
            );

        $products = $productOfferMapper->mapCollection(
            $order->getProductOffers()
        );
        // $products = [];
        
        // foreach ($order->getProductOffers() as $productOffer) {
        //     $offer = $productOffer->getOffer();
        //     $product = $offer->getProduct();
        //     $seller = $offer->getSeller();
            
        //     $products[] = [
        //         'product_id' => $product->getId(),
        //         'title'=> $product->getTitle(),
        //         'price' => (float) $offer->getPrice(),
        //         'img_src' => $product->getImageSrc(),
        //         'region' => $product->getRegion(),
        //         'platform' => $product->getPlatform(),
        //         'offer_id' => $offer->getId(),
        //         'seller_name' => $seller->getName(),
        //         'seller_url' => $seller->getUrl(),
        //         'seller_img_src' => $seller->getImgSrc(),
        //         'product_key' => $productOffer->getProductKey()?->getKey() ?? null,
        //     ];
        // }
        return $this->json([
            'id' => $order->getId(),
            'price' => $order->getPrice(),
            'date' => $order->getDate()->format(\DateTimeInterface::ATOM),
            'status' => $order->getStatus()->value,
            'products' => $products,
        ]);
    }
    #[Route('/api/orders/{id}/complete', name: 'api_order_complete', methods: ['POST'])]
    public function completeOrder(
        Order $order,
        EntityManagerInterface $entityManager,
    ): JsonResponse {
        if ($order->getStatus() !== OrderStatus::PAID) {
            return $this->json([
                'success' => false,
                'error' => 'Only paid orders can be completed.'
            ], 409);
        }

        $connection = $entityManager->getConnection();

        $connection->beginTransaction();

        try {
            $productKeyRepository = $entityManager->getRepository(ProductKey::class);

            foreach ($order->getProductOffers() as $productOffer) {
                $offer = $productOffer->getOffer();

                // Find and lock one available key for this offer.
                $productKey = $productKeyRepository
                    ->createQueryBuilder('pk')
                    ->where('pk.offer = :offer')
                    ->andWhere('pk.productOffer IS NULL')
                    ->setParameter('offer', $offer)
                    ->setMaxResults(1)
                    ->getQuery()
                    ->setLockMode(LockMode::PESSIMISTIC_WRITE)
                    ->getOneOrNullResult();

                if (!$productKey) {
                    throw new \RuntimeException(
                        'No available product key for offer: ' . $offer->getId()
                    );
                }
                $productOffer->setProductKey($productKey);
                $productKey->setProductOffer($productOffer);
                $entityManager->flush();
            }

            // All product keys were successfully assigned.
            $order->setStatus(OrderStatus::COMPLETED);

            $entityManager->flush();
            $connection->commit();

            return $this->json([
                'success' => true,
                'message' => 'Order completed successfully.',
                'orderId' => $order->getId(),
                'status' => 'completed'
            ]);

        } catch (\RuntimeException $exception) {
            $connection->rollBack();

            return $this->json([
                'success' => false,
                'error' => $exception->getMessage()
            ], 409);

        } catch (\Throwable $exception) {
            $connection->rollBack();

            return $this->json([
                'success' => false,
                'error' => 'An error occurred while completing the order.\n'.$exception->getMessage()
            ], 500);
        }
    }
}