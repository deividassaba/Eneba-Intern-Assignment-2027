# Eneba Intern Assignment 2027

A digital game marketplace application inspired by Eneba. The project
includes a React storefront and a Symfony API for user authentication,
product offers, orders, and PayPal checkout.

## TO DO

-   Refresh token
-   Code cleanup
-   Linter
-   Entity ProductOffer refactor to OrderOffer
-   Variable naming a_b or aB
-   Magic variables: routes, image urls etc.
-   Add filters to StorePage by Region, price etc. 
-   App secret. 
-   Hide jwt keys. 

## Tech stack

### Frontend

-   React
-   TypeScript
-   SCSS
-   React Router
-   Fetch API for backend communication
-   PayPal JavaScript SDK / React PayPal integration

### Backend

-   PHP
-   Symfony
-   Doctrine ORM
-   PostgreSQL
-   JWT authentication

## Project structure

The repository is organized into separate frontend and backend
applications. Adjust the directory names below if your local repository
uses different ones.

``` text
project/
├── frontend/    # React + TypeScript application
└── backend/     # Symfony API
```


## Requirements

Install the following before running the project:

-   Node.js (LTS recommended) and npm
-   PHP version supported by the Symfony project
-   Composer
-   PostgreSQL
-   Symfony CLI (optional, but useful for running the API locally)

## Getting started

### 1. Clone the repository

``` bash
git clone <repository-url>
cd <repository-directory>
```

### 2. Configure and run the backend

Open a terminal in the backend directory:

``` bash
cd backend
composer install
```

Create your local environment file if it does not already exist:

``` bash
cp .env .env.local
```

Configure the database connection in `.env.local`. For example:

``` dotenv
DATABASE_URL="postgresql://USER:PASSWORD@127.0.0.1:5432/DATABASE_NAME?serverVersion=16&charset=utf8"
```

Replace the example username, password, database name, and PostgreSQL
version with your local values. Remove the space before `DATABASE_NAME`
in the example when setting your actual value.

Create the database and run migrations:

``` bash
php bin/console doctrine:database:create
php bin/console doctrine:migrations:migrate
```

If the project uses LexikJWTAuthenticationBundle and the JWT key pair
has not already been generated, generate it with:

``` bash
php bin/console lexik:jwt:generate-keypair
```

Start the Symfony development server:

``` bash
symfony server:start
```

If Symfony CLI is not installed, you can use PHP's built-in server as an
alternative:

``` bash
php -S 127.0.0.1:8000 -t public
```

Keep the backend terminal running.

### 3. Configure and run the frontend

Open a second terminal in the frontend directory:

``` bash
cd frontend
npm install
```

Configure the API base URL using the configuration approach already
present in the frontend project. The frontend should point to the
address where the Symfony API is running.

For a Vite project, a typical local environment variable is:

``` dotenv
VITE_API_BASE_URL=http://127.0.0.1:8000
```

Start the frontend development server:

``` bash
npm run dev
```

Open the local URL printed by Vite in your terminal (commonly
`http://localhost:5173`).

> If the project uses a different frontend build tool or scripts, use
> the commands defined in `frontend/package.json`.

## PayPal sandbox configuration

The checkout flow uses PayPal. For local testing:

1.  Create or use a PayPal Developer account.
2.  Create a Sandbox REST app and obtain its Client ID and Secret.
3.  Configure the credentials in the backend environment using the
    variable names expected by the payment integration.
4.  Configure the matching Sandbox Client ID in the frontend PayPal SDK
    provider.
5.  Use PayPal Sandbox buyer and seller accounts for test transactions.

Do not commit real credentials, API secrets, private keys, or
`.env.local` files to the repository.

## Main functionality

-   Browse products and available seller offers.
-   View product and offer details.
-   Register and log in using JWT authentication.
-   Add offers to the shopping cart.
-   Create orders for selected offers.
-   View the user's order history and individual order details.
-   Complete checkout using PayPal Sandbox.

## Useful commands

### Frontend

``` bash
npm install       # Install dependencies
npm run dev       # Start the development server
npm run build     # Build for production
npm run lint      # Run linting, if configured
```

### Backend

``` bash
composer install
php bin/console doctrine:database:create
php bin/console doctrine:migrations:migrate
php bin/console cache:clear
php bin/console debug:router
symfony server:start
```

## Notes

-   The backend is responsible for validating authentication, checking
    offer availability, calculating order totals, and verifying payment
    results. Do not rely on prices or payment-success values sent by the
    frontend.
-   Configure CORS to allow requests from the frontend development
    origin.
-   Keep local environment files and credentials out of version control.
-   Exact environment variable names and available npm scripts depend on
    the configuration in this repository.
