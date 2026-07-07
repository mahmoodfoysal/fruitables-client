# Fruitable - Ecommerce project

FruitBazar is a high-performance, full-stack e-commerce application tailored for the organic retail sector. Engineered with a deep focus on speed, structural data filtering, and secure user sessions, the platform provides a friction-free pipeline from farm-fresh discovery to secure checkout. The interface is optimized to drive user engagement through immersive landing modules, dynamic state-driven cart systems, and authenticated customer feedback loops.

## Live Demo

- Live URL: [https://frutibazar.web.app/](https://frutibazar.web.app/)

## Repository

- GitHub Client: [https://github.com/mahmoodfoysal/fruitables-client](https://github.com/mahmoodfoysal/fruitables-client)
-
- GitHub Backend: [https://github.com/mahmoodfoysal/fruitable-server](https://github.com/mahmoodfoysal/fruitable-server)

## Technologies Used

- Vue.js (Options API)
- vue router 4
- Pinia
- Firebase
- Node.js
- Express.js
- MongoDB
- HTML
- Bootstrap CSS
- CSS

## Key Features

- Architected an immersive landing experience featuring modular carousels for promotional offers, dedicated rows for organic greens and seasonal fruits, a high-visibility bestseller showcase, and data-driven customer testimonial boards.

- Engineered a universal product routing system accessible via a central navigation portal, serving the entire storefront's catalog within a clean, performant grid.

- Implemented highly responsive client-side filtering logic that allows shoppers to effortlessly narrow down inventories using price-range boundaries and category taxonomies simultaneously.

- Designed a dedicated checkout basket featuring inline reactive state management, allowing users to increment/decrement quantities or purge items with instant, subtotal-accurate price calculations.

- Built a secure, route-protected checkout interface that mandates user session verification before opening a dedicated form to capture critical client delivery metadata.

- Architected a dedicated shopping cart hub featuring reactive state coordination, enabling shoppers to instantly review all selected items and track itemized price breakdowns in real time.

- Engineered an automated, route-guarded order placement interface that mandates secure user authentication before processing transactions to protect system integrity.

## Setup and Installation

### 1) Clone the repository

```terminal
git clone https://github.com/mahmoodfoysal/fruitables-client.git
cd project_name
```

### 2) Install dependencies

```terminal
npm install
```

### 3) Configure environment variables

Create a `.env.local` file in the root directory and add:

```env

VITE_APP_API_KEY=your_key
VITE_APP_AUTH_DOMAIN=your_domain
VITE_APP_PROJECT_ID=your_project_id
VITE_APP_STORAGE_BUCKET=your_storage_bucket
VITE_APP_MESSAGING_SENDER_ID=your_sender_id
VITE_APP_APP_ID=your_app_id

```

Do not commit `.env.local` to version control.

### 4) Run the development server

```terminal
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### 5) Build for production

```terminal
npm run build
```
