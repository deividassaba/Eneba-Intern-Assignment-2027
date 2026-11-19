<?php

namespace App\Entity;

use App\Repository\OfferRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
#[ORM\Table(name: '`offers`')]
#[ORM\Entity(repositoryClass: OfferRepository::class)]
class Offer
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\ManyToOne(inversedBy: 'offers')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Product $product = null;

    #[ORM\Column(type: Types::DECIMAL, precision: 10, scale: 2)]
    private ?string $price = null;

    /**
     * @var Collection<int, ProductOffer>
     */
    #[ORM\OneToMany(targetEntity: ProductOffer::class, mappedBy: 'product', orphanRemoval: true)]
    private Collection $product_offers;

    #[ORM\ManyToOne(inversedBy: 'offers')]
    private ?Seller $seller = null;

    /**
     * @var Collection<int, ProductKey>
     */
    #[ORM\OneToMany(targetEntity: ProductKey::class, mappedBy: 'offer')]
    private Collection $productKeys;


    public function __construct()
    {
        $this->productKeys = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getProduct(): ?Product
    {
        return $this->product;
    }

    public function setProduct(?Product $product): static
    {
        $this->product = $product;

        return $this;
    }

    public function getPrice(): ?string
    {
        return $this->price;
    }

    public function setPrice(string $price): static
    {
        $this->price = $price;

        return $this;
    }

    /**
     * @return Collection<int, ProductOffer>
     */
    public function getProductOffers(): Collection
    {
        return $this->product_offers;
    }

    public function addProductOffer(ProductOffer $ProductOffer): static
    {
        if (!$this->product_offers->contains($ProductOffer)) {
            $this->product_offers->add($ProductOffer);
            $ProductOffer->setProduct($this);
        }

        return $this;
    }

    public function removeProductOffer(ProductOffer $ProductOffer): static
    {
        if ($this->product_offers->removeElement($ProductOffer)) {
            // set the owning side to null (unless already changed)
            if ($ProductOffer->getProduct() === $this) {
                $ProductOffer->setProduct(null);
            }
        }

        return $this;
    }
    public function hasAvailableOffers(): bool
    {
        // return false;
        // foreach ($this->product_offers as $productOffer) {
        //     if ($productOffer->getOrder() === null) {
        //         return true;
        //     }
        // }
        // return false;
        return $this->product_offers->exists(
        fn (int $key, ProductOffer $productOffer) =>
            $productOffer->getOrder() === null
    );
    }

    public function getSeller(): ?Seller
    {
        return $this->seller;
    }

    public function setSeller(?Seller $seller): static
    {
        $this->seller = $seller;

        return $this;
    }

    /**
     * @return Collection<int, ProductKey>
     */
    public function getProductKeys(): Collection
    {
        return $this->productKeys;
    }

    public function addProductKey(ProductKey $productKey): static
    {
        if (!$this->productKeys->contains($productKey)) {
            $this->productKeys->add($productKey);
            $productKey->setOffer($this);
        }

        return $this;
    }

    public function removeProductKey(ProductKey $productKey): static
    {
        if ($this->productKeys->removeElement($productKey)) {
            // set the owning side to null (unless already changed)
            if ($productKey->getOffer() === $this) {
                $productKey->setOffer(null);
            }
        }

        return $this;
    }
}
