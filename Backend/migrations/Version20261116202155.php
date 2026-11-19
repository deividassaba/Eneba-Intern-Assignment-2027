<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20261116202155 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE product_offers ALTER order_id DROP NOT NULL');
        $characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

        for ($i = 0; $i < 20; $i++) {
        $parts = [];

        for ($j = 0; $j < 5; $j++) {
            $part = '';

            for ($k = 0; $k < 5; $k++) {
                $part .= $characters[random_int(0, strlen($characters) - 1)];
            }

            $parts[] = $part;
        }
            $this->addSql(
                'INSERT INTO "product_offers" ("key", offer_id, order_id)
                VALUES (?, ?, NULL)',
                [implode('-', $parts), random_int(1, 20)]
            );
        }
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE "product_offers" ALTER order_id SET NOT NULL');
        $this->addSql('DELETE FROM "product_offers"');
    }
}
