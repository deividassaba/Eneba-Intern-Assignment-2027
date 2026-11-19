<?php

namespace App\Mapper;

use App\Entity\ProductOffer;
use App\Repository\ProductKeyRepository;
class ProductOfferMapper
{
    public function __construct(
        private ProductKeyRepository $productKeyRepository
    ) {}
    public function map(ProductOffer $productOffer): array
    {
        $offer = $productOffer->getOffer();
        $product = $offer->getProduct();
        $seller = $offer->getSeller();

        return [
            'product_id' => $product->getId(),
            'title' => $product->getTitle(),
            'price' => number_format($offer->getPrice, 2)/*(float) $offer->getPrice()*/,
            'img_src' => $product->getImageSrc(),
            'region' => $product->getRegion(),
            'platform' => $product->getPlatform(),
            'offer_id' => $offer->getId(),
            'seller_name' => $seller->getName(),
            'seller_url' => $seller->getUrl(),
            'seller_img_src' => $seller->getImgSrc(),
            'product_key' => $productOffer->getProductKey()?->getKey(),
            'available' => $this->productKeyRepository->hasAvailableByOfferId($offer->getId())
        ];
    }

    public function mapCollection(iterable $productOffers): array
    {
        $products = [];

        foreach ($productOffers as $productOffer) {
            $products[] = $this->map($productOffer);
        }

        return $products;
    }
}
