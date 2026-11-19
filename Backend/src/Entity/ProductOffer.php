<?php

namespace App\Entity;

use App\Repository\ProductOfferRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
#[ORM\Table(name: '`product_offers`')]
#[ORM\Entity(repositoryClass: ProductOfferRepository::class)]
class ProductOffer
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\ManyToOne(inversedBy: 'product_offers')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Offer $offer = null;

    #[ORM\ManyToOne(inversedBy: 'product_offers')]
    #[ORM\JoinColumn(nullable: true)]
    private ?Order $order = null;


    #[ORM\OneToOne(mappedBy: 'productOffer', cascade: ['persist', 'remove'])]
    private ?ProductKey $productKey = null;

    public function __construct()
    {
        $this->productKeys = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getOrder(): ?Offer
    {
        return $this->order;
    }

    public function setOrder(?Order $order): static
    {
        $this->order = $order;

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

    public function getProductKey(): ?ProductKey
    {
        return $this->productKey;
    }

    public function setProductKey(?ProductKey $productKey): static
    {
        // unset the owning side of the relation if necessary
        if ($productKey === null && $this->productKey !== null) {
            $this->productKey->setProductOffer(null);
        }

        // set the owning side of the relation if necessary
        if ($productKey !== null && $productKey->getProductOffer() !== $this) {
            $productKey->setProductOffer($this);
        }

        $this->productKey = $productKey;

        return $this;
    }


}
