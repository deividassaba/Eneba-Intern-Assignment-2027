<?php

namespace App\Repository;

use App\Entity\ProductKey;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<ProductKey>
 */
class ProductKeyRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, ProductKey::class);
    }
    public function findAvailableByOfferIds(array $offerIds): array
    {
        return $this->createQueryBuilder('po')
            ->where('po.offer IN (:offerIds)')
            ->andWhere('po.productOffer IS NULL')
            ->setParameter('offerIds', $offerIds)
            ->getQuery()
            ->getResult();
    }
    public function hasAvailableByOfferIds(int $offerId): bool
    {
        return (bool) $this->createQueryBuilder('po')
            ->select('1')
            ->where('po.offer IN (:offerIds)')
            ->andWhere('po.productOffer IS NULL')
            ->setParameter('offerIds', $offerId)
            ->setMaxResults(1)
            ->getQuery()
            ->getOneOrNullResult();
    }
    public function hasAvailableByOfferId(int $offerId): bool
    {
        return (bool) $this->createQueryBuilder('po')
            ->select('po.id')
            ->where('po.offer = :offerId')
            ->andWhere('po.productOffer IS NULL')
            ->setParameter('offerId', $offerId)
            ->setMaxResults(1)
            ->getQuery()
            ->getOneOrNullResult();
    }
    public function findAvailableByOfferId(int $offerId): ?ProductOffer
    {
        return $this->createQueryBuilder('po')
            ->where('po.offer = :offerId')
            ->andWhere('po.productOffer IS NULL')
            ->setParameter('offerId', $offerId)
            ->setMaxResults(1)
            ->getQuery()
            ->getOneOrNullResult();
    }
//    /**
//     * @return ProductKey[] Returns an array of ProductKey objects
//     */
//    public function findByExampleField($value): array
//    {
//        return $this->createQueryBuilder('p')
//            ->andWhere('p.exampleField = :val')
//            ->setParameter('val', $value)
//            ->orderBy('p.id', 'ASC')
//            ->setMaxResults(10)
//            ->getQuery()
//            ->getResult()
//        ;
//    }

//    public function findOneBySomeField($value): ?ProductKey
//    {
//        return $this->createQueryBuilder('p')
//            ->andWhere('p.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}
