# Fruitable - Ecommerce project

Organic fruit and vegetable shop built with Vue 3 and Pinia. Features complex filtering and newsletter integration

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

- Price-range and category filtering for organic items
- Footer subscription system and client satisfaction testimonials
- Related product suggestions on the details page

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
