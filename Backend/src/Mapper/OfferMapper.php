<?php

namespace App\Mapper;

use App\Entity\Offer;
use App\Repository\ProductKeyRepository;

class OfferMapper
{
    public function __construct(
        private ProductKeyRepository $productKeyRepository
    ) {}
    public function map(Offer $offer): array
    {
        $product = $offer->getProduct();
        $seller = $offer->getSeller();
        return [
            'product_id' => $product->getId(),
            'title' => $product->getTitle(),
            'price' => /*number_format($offer->getPrice, 2)*/ (float) $offer->getPrice(),
            'img_src' => $product->getImageSrc(),
            'region' => $product->getRegion(),
            'platform' => $product->getPlatform(),
            'offer_id' => $offer->getId(),
            'seller_name' => $seller->getName(),
            'seller_url' => $seller->getUrl(),
            'seller_img_src' => $seller->getImgSrc(),
            'product_key' => null,
            'available' => $this->productKeyRepository->hasAvailableByOfferId($offer->getId())
        ];
    }

    public function mapCollection(iterable $offers): array
    {
        $products = [];

        foreach ($offers as $offer) {
            $products[] = $this->map($offer);
        }

        return $products;
    }
}
