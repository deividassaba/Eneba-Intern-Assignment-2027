<?php

namespace App\Controller;

use App\Entity\Order;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Security\Http\Attribute\IsGranted;
use Symfony\Contracts\HttpClient\HttpClientInterface;
use App\Enum\OrderStatus;
#[Route('/api/payments')]
#[IsGranted('ROLE_USER')]
final class PaymentsController extends AbstractController
{
    
    public function __construct(
        private HttpClientInterface $httpClient,
        private EntityManagerInterface $entityManager,
        private string $paypalClientId,
        private string $paypalClientSecret,
        private string $paypalBaseUrl,
        private string $paypalCurrency,
    ) {}

    private function getAccessToken(): string
    {
        $response = $this->httpClient->request(
            'POST',
            $this->paypalBaseUrl . '/v1/oauth2/token',
            [
                'auth_basic' => [
                    $this->paypalClientId,
                    $this->paypalClientSecret,
                ],
                'headers' => [
                    'Accept' => 'application/json',
                    'Accept-Language' => 'en_US',
                ],
                'body' => [
                    'grant_type' => 'client_credentials',
                ],
            ]
        );

        $data = $response->toArray();

        return $data['access_token'];
    }

    #[Route('/create/{id}', methods: ['POST'])]
    public function create(
        Order $order
    ): JsonResponse {
        if ($order->getUser() !== $this->getUser()) {
            return $this->json(['error' => 'Forbidden'], 403);
        }

        if ($order->getStatus() === 'paid') {
            return $this->json(['error' => 'Order already paid'], 400);
        }

        // Calculate the total on the backend.
        // Replace getPrice() with your actual Order total calculation.
        $total = number_format((float) $order->getPrice(), 2, '.', '');

        try {
            $accessToken = $this->getAccessToken();

            $response = $this->httpClient->request(
                'POST',
                $this->paypalBaseUrl . '/v2/checkout/orders',
                [
                    'headers' => [
                        'Authorization' => 'Bearer ' . $accessToken,
                        'Content-Type' => 'application/json',
                    ],
                    'json' => [
                        'intent' => 'CAPTURE',
                        'purchase_units' => [
                            [
                                'reference_id' => (string) $order->getId(),
                                'custom_id' => (string) $order->getId(),
                                'amount' => [
                                    'currency_code' => $this->paypalCurrency,
                                    'value' => $total,
                                ],
                            ],
                        ],
                    ],
                ]
            );

            $paypalOrder = $response->toArray();

            $order->setPaypalOrderId($paypalOrder['id']);
            $this->entityManager->flush();

            return $this->json([
                'id' => $paypalOrder['id'],
            ]);

        } catch (\Symfony\Contracts\HttpClient\Exception\HttpExceptionInterface $e) {
    return $this->json([
        'error' => 'PayPal HTTP error',
        'status' => $e->getResponse()->getStatusCode(),
        'details' => $e->getResponse()->toArray(false),
    ], 502);

} catch (\Throwable $e) {
    return $this->json([
        'error' => $e->getMessage(),
        'type' => get_class($e),
    ], 500);
}
        // catch (\Throwable $e) {
        //     return $this->json([
        //         'error' => 'Could not create PayPal order',
        //     ], 502);
        // }
    }

    #[Route('/capture/{id}', methods: ['POST'])]
    public function capture(
        Order $order,
        \Symfony\Component\HttpFoundation\Request $request
    ): JsonResponse {
        if ($order->getUser() !== $this->getUser()) {
            return $this->json(['error' => 'Forbidden'], 403);
        }

        if ($order->getStatus() === 'paid') {
            return $this->json(['error' => 'Order already paid'], 400);
        }
        $total = $order->getPrice();
        $data = json_decode($request->getContent(), true);
        $paypalOrderId = $data['paypalOrderId'] ?? null;

        if (
            !$paypalOrderId ||
            $paypalOrderId !== $order->getPaypalOrderId()
        ) {
            return $this->json(['error' => 'Invalid PayPal order'], 400);
        }

        try {
            $accessToken = $this->getAccessToken();

            $response = $this->httpClient->request(
                'POST',
                $this->paypalBaseUrl .
                    '/v2/checkout/orders/' .
                    urlencode($paypalOrderId) .
                    '/capture',
                [
                    'headers' => [
                        'Authorization' => 'Bearer ' . $accessToken,
                        'Content-Type' => 'application/json',
                    ],
                    'json' => new \stdClass(),
                ]
            );

            $capture = $response->toArray();

            if (($capture['status'] ?? null) !== 'COMPLETED') {
                return $this->json([
                    'error' => 'Payment was not completed',
                ], 400);
            }

            // Verify captured amount and currency against the local order.
            $unit = $capture['purchase_units'][0] ?? [];
            $captureDetails = $unit['payments']['captures'][0] ?? [];
            $amount = $captureDetails['amount'] ?? [];

            $expectedTotal = number_format(
                (float) $order->getPrice(),
                2,
                '.',
                ''
            );

            if (
                ($amount['currency_code'] ?? null) !== $this->paypalCurrency ||
                ($amount['value'] ?? null) !== $expectedTotal
            ) {
                return $this->json([
                    'error' => 'Captured amount does not match order',
                ], 400);
            }

            $order->setStatus(OrderStatus::PAID);
            $this->entityManager->flush();

            return $this->json([
                'success' => true,
                'status' => OrderStatus::PAID,
            ]);

        } catch (\Throwable $e) {
            return $this->json([
                'error' => 'Could not capture PayPal payment'.$e->getMessage(),
            ], 502);
        }
    }
}
