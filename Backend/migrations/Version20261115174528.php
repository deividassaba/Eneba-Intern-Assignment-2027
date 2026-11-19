<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20261115174528 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }


    public function up(Schema $schema): void
    {
        // PRODUCTS
        $this->addSql(<<<'SQL'
            INSERT INTO products (image_src, title) VALUES
            ('/images/example_product.jpg', 'Minecraft: Java & Bedrock Edition (PC)'),
            ('/images/example_product.jpg', 'Elden Ring (PC)'),
            ('/images/example_product.jpg', 'Dead by Daylight (PC)'),
            ('/images/example_product.jpg', 'Cyberpunk 2077 (Xbox One)'),
            ('/images/example_product.jpg', 'Risk of Rain 2 (PC)'),
            ('/images/example_product.jpg', 'Resident Evil Village (PC)'),
            ('/images/example_product.jpg', 'Back 4 Blood (PC)'),
            ('/images/example_product.jpg', 'The Last of Us Part II Remastered (PC)'),
            ('/images/example_product.jpg', 'Slime Rancher (PC)'),
            ('/images/example_product.jpg', 'Grand Theft Auto V (PC)')
        SQL);

        // SELLERS
        // These are fictional demo sellers, not actual Eneba seller accounts.
        $this->addSql(<<<'SQL'
            INSERT INTO "sellers" (name, url, img_src) VALUES
            ('GameStore EU', 'https://www.eneba.com/', '/images/example_seller.jpg'),
            ('DigitalKeys Hub', 'https://www.eneba.com/', '/images/example_seller.jpg'),
            ('PixelMarket', 'https://www.eneba.com/', '/images/example_seller.jpg'),
            ('FastKeys', 'https://www.eneba.com/', '/images/example_seller.jpg'),
            ('GamingDeals', 'https://www.eneba.com/', '/images/example_seller.jpg')
        SQL);

        // OFFERS
        // Prices are illustrative EUR values.
        $this->addSql(<<<'SQL'
            INSERT INTO "offers" (price, product_id, seller_id)
            SELECT data.price, p.id, s.id
            FROM (VALUES
                ('Minecraft: Java & Bedrock Edition (PC)', 'GameStore EU', 19.99),
                ('Minecraft: Java & Bedrock Edition (PC)', 'DigitalKeys Hub', 18.49),

                ('Elden Ring (PC)', 'GameStore EU', 39.99),
                ('Elden Ring (PC)', 'PixelMarket', 37.50),

                ('Dead by Daylight (PC)', 'FastKeys', 12.99),
                ('Dead by Daylight (PC)', 'GamingDeals', 10.99),

                ('Cyberpunk 2077 (Xbox One)', 'DigitalKeys Hub', 24.99),
                ('Cyberpunk 2077 (Xbox One)', 'PixelMarket', 22.50),

                ('Risk of Rain 2 (PC)', 'FastKeys', 8.99),
                ('Risk of Rain 2 (PC)', 'GameStore EU', 7.49),

                ('Resident Evil Village (PC)', 'GamingDeals', 14.99),
                ('Resident Evil Village (PC)', 'DigitalKeys Hub', 13.50),

                ('Back 4 Blood (PC)', 'PixelMarket', 9.99),
                ('Back 4 Blood (PC)', 'FastKeys', 7.99),

                ('The Last of Us Part II Remastered (PC)', 'GameStore EU', 39.99),
                ('The Last of Us Part II Remastered (PC)', 'GamingDeals', 36.99),

                ('Slime Rancher (PC)', 'DigitalKeys Hub', 3.99),
                ('Slime Rancher (PC)', 'FastKeys', 2.99),

                ('Grand Theft Auto V (PC)', 'PixelMarket', 14.99),
                ('Grand Theft Auto V (PC)', 'GameStore EU', 12.99)
            ) AS data(title, seller_name, price)
            INNER JOIN products p ON p.title = data.title
            INNER JOIN "sellers" s ON s.name = data.seller_name
        SQL);

        // OPTIONAL DEMO ORDER
        // Created only if at least one user already exists.
        // The keys below are placeholders, not real activation codes.
        $this->addSql(<<<'SQL'
            WITH selected_user AS (
                SELECT id
                FROM "users"
                ORDER BY id
                LIMIT 1
            ),
            new_order AS (
                INSERT INTO "orders" (user_id)
                SELECT id FROM selected_user
                RETURNING id
            )
            INSERT INTO "product_offers" ("key", offer_id, order_id)
            SELECT
                'DEMO-ORDER-' || o.id || '-' || ROW_NUMBER() OVER (ORDER BY o.id),
                o.id,
                n.id
            FROM "offers" o
            CROSS JOIN new_order n
            WHERE o.id IN (
                SELECT MIN(id)
                FROM "offers"
                GROUP BY product_id
                ORDER BY MIN(id)
                LIMIT 3
            )
        SQL);
    }

    public function down(Schema $schema): void
    {
        // $this->addSql('TRUNCATE TABLE "orders"');
        // $this->addSql('TRUNCATE TABLE "offers"');
        // $this->addSql('TRUNCATE TABLE "product_offers"');
        // $this->addSql('TRUNCATE TABLE products');
        // $this->addSql('TRUNCATE TABLE "sellers"');
        // $this->addSql('TRUNCATE TABLE "users"');
    }

}
