<?php

namespace App\Entity;

use App\Repository\ProductKeyRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: ProductKeyRepository::class)]
#[ORM\Table(name: '`product_keys`')]
class ProductKey
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $key = null;

    #[ORM\OneToOne(inversedBy: 'productKey', cascade: ['persist', 'remove'])]
    private ?ProductOffer $productOffer = null;

    #[ORM\ManyToOne(inversedBy: 'productKeys')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Offer $offer = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getKey(): ?string
    {
        return $this->key;
    }

    public function setKey(string $key): static
    {
        $this->key = $key;

        return $this;
    }


    public function getProductOffer(): ?ProductOffer
    {
        return $this->productOffer;
    }

    public function setProductOffer(?ProductOffer $productOffer): static
    {
        $this->productOffer = $productOffer;

        return $this;
    }

    public function getOffer(): ?Offer
    {
        return $this->offer;
    }

    public function setOffer(?Offer $offer): static
    {
        $this->offer = $offer;

        return $this;
    }
}
