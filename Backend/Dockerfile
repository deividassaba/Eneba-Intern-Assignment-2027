
FROM php:8.4-apache

ENV APP_ENV=prod
ENV APP_DEBUG=0
ENV APACHE_DOCUMENT_ROOT=/var/www/html/public

# Install PHP extensions and dependencies
RUN apt-get update && apt-get install -y \
    git \
    unzip \
    libicu-dev \
    libpq-dev \
    libzip-dev \
    && docker-php-ext-install \
        intl \
        pdo_pgsql \
        zip \
        opcache \
    && a2enmod rewrite \
    && rm -rf /var/lib/apt/lists/*

# Install Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html

# Copy application
COPY . .

# Install production dependencies
RUN composer install \
    --no-dev \
    --prefer-dist \
    --no-interaction \
    --optimize-autoloader

# Verify Symfony front controller exists
RUN test -f public/index.php

# Configure Apache document root
RUN sed -ri \
    "s!/var/www/html!${APACHE_DOCUMENT_ROOT}!g" \
    /etc/apache2/sites-available/000-default.conf

# Configure Apache directory permissions
RUN echo '<Directory /var/www/html/public>' > /etc/apache2/conf-available/symfony.conf \
    && echo '    AllowOverride All' >> /etc/apache2/conf-available/symfony.conf \
    && echo '    Require all granted' >> /etc/apache2/conf-available/symfony.conf \
    && echo '</Directory>' >> /etc/apache2/conf-available/symfony.conf \
    && a2enconf symfony

# Symfony permissions
RUN mkdir -p var/cache var/log \
    && chown -R www-data:www-data var \
    && chmod -R 775 var

EXPOSE 10000

CMD ["sh", "-c", "mkdir -p config/jwt && cp /etc/secrets/private.pem config/jwt/private.pem && cp /etc/secrets/public.pem config/jwt/public.pem && chown www-data:www-data config/jwt/*.pem && chmod 640 config/jwt/*.pem && php bin/console doctrine:migrations:migrate --no-interaction --env=prod && sed -i \"s/Listen 80/Listen ${PORT:-10000}/\" /etc/apache2/ports.conf && sed -i \"s/<VirtualHost \\*:80>/<VirtualHost *:${PORT:-10000}>/\" /etc/apache2/sites-available/000-default.conf && apache2-foreground"]