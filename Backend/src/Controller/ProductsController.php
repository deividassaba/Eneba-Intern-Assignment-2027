<?php

namespace App\Controller;

use App\Entity\Product;
use Doctrine\ORM\EntityManagerInterface;
use App\Repository\ProductKeyRepository;
use App\Mapper\OfferMapper;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;

final class ProductsController extends AbstractController
{

    #[Route('/api/products', name: 'product_search', methods: ['GET'])]
    public function search(
        Request $request,
        EntityManagerInterface $entityManager,
    ): JsonResponse {
        $search = trim($request->query->get('search', ''));
        $limit = $request->query->get('limit');

        $qb = $entityManager
            ->getRepository(Product::class)
            ->createQueryBuilder('p')
            ->orderBy('p.title', 'ASC');

        if ($search !== '') {
            $qb->where('LOWER(p.title) LIKE LOWER(:title)')
                ->setParameter('title', '%' . $search . '%');
        }

        if ($limit !== null && $limit !== '') {
            $limit = filter_var($limit, FILTER_VALIDATE_INT);

            if ($limit === false || $limit < 1) {
                return $this->json([
                    'error' => 'Limit must be a positive integer.',
                ], 400);
            }

            $qb->setMaxResults($limit);
        }

        $products = $qb->getQuery()->getResult();

        $data = [];

        foreach ($products as $product) {
            $data[] = [
                'id' => $product->getId(),
                'title' => $product->getTitle(),
                'price' => $product->getMinPrice(),
                'img_src' => $product->getImageSrc(),
                'region' => $product->getRegion(),
                'platform' => $product->getPlatform(),
            ];
        }

        return $this->json($data);
    }

    #[Route('/api/products/{id}', name: 'app_product_show', methods: ['GET'])]
    public function show(
        int $id,
        EntityManagerInterface $entityManager,
        ProductKeyRepository $productKeyRepository,
        OfferMapper $offerMapper
    ): JsonResponse {
        $product = $entityManager
            ->getRepository(Product::class)
            ->find($id);

        if (!$product) {
            return $this->json([
                'error' => 'Product not found'
            ], JsonResponse::HTTP_NOT_FOUND);
        }
        $offers = $offerMapper->mapCollection(
            $product->getOffers()
        );
        //     $offers = [];

        // foreach ($product->getOffers() as $offer) {
        //     $seller = $offer->getSeller();
        //     $product = $productOfferMapper->map($productOffer);
        //     $offers[] = [
        //         'id' => $offer->getId(),
        //         'price' => (float) $offer->getPrice(),
        //         'seller_name' => $seller?->getName() ?? '',
        //         'seller_url' => $seller?->getUrl() ?? '',
        //         'seller_img_src' => $seller?->getImgSrc() ?? '',
        //         // 'available' => $offer->hasAvailableOffers()
        //         'available' => $productKeyRepository->hasAvailableByOfferId($offer->getId())
        //     ];
        // }

        return $this->json([
            'id' => $product->getId(),
            'title' => $product->getTitle(),
            'price' => (float) ($product->getMinPrice() ?? 0),
            'img_src' => $product->getImageSrc(),
            'region' => $product->getRegion(),
            'platform' => $product->getPlatform(),
            'offers' => $offers,
        ]);
        }
}

