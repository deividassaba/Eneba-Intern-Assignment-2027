<?php

namespace App\Entity;

use App\Repository\OrderRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use App\Enum\OrderStatus;

#[ORM\Entity(repositoryClass: OrderRepository::class)]
#[ORM\Table(name: '`orders`')]
class Order
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    /**
     * @var Collection<int, User>
     */


    #[ORM\ManyToOne(inversedBy: 'orders')]
    #[ORM\JoinColumn(nullable: false)]
    private ?User $user = null;

    #[ORM\OneToMany(targetEntity: ProductOffer::class, mappedBy: 'order', orphanRemoval: true)]
    private Collection $product_offers;

    #[ORM\Column]
    private ?\DateTime $date = null;

    #[ORM\Column(type: Types::DECIMAL, precision: 10, scale: 2)]
    private ?string $price = null;
    
    #[ORM\Column(
        type: 'string',
        length: 20,
        enumType: OrderStatus::class
    )]
    private OrderStatus $status = OrderStatus::PENDING;


    public function __construct()
    {
        $this->product_offers = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(?User $user): static
    {
        $this->user = $user;

        return $this;
    }

    /**
     * @return Collection<int, ProductOffer>
     */
    public function getProductOffers(): Collection
    {
        return $this->product_offers;
    }

    public function addProductOffer(ProductOffer $product_offer): static
    {
        if (!$this->product_offers->contains($product_offer)) {
            $this->product_offers->add($product_offer);
        }

        return $this;
    }

    public function removeProductOffer(ProductOffer $product_offer): static
    {
        $this->product_offers->removeElement($product_offer);

        return $this;
    }

    public function getDate(): ?\DateTime
    {
        return $this->date;
    }

    public function setDate(\DateTime $date): static
    {
        $this->date = $date;

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
    public function getStatus(): OrderStatus
    {
        return $this->status;
    }

    public function setStatus(OrderStatus $status): self
    {
        $this->status = $status;

        return $this;
    }
    #[ORM\Column(length: 100, nullable: true)]
    private ?string $paypalOrderId = null;


    public function getPaypalOrderId(): ?string
    {
        return $this->paypalOrderId;
    }

    public function setPaypalOrderId(?string $paypalOrderId): static
    {
        $this->paypalOrderId = $paypalOrderId;
        return $this;
    }


}
