# Naturopathy Portfolio

A modern, multilingual portfolio and consultation site for a naturopathy practice. The frontend is built with React + Vite + Tailwind CSS, and a lightweight Express server handles contact form submissions via Nodemailer (SMTP).

## Features

- Responsive, single-page experience with lazy-loaded sections
- Multilingual content with language context
- Themed UI with Tailwind CSS
- Contact form with validation and SMTP email delivery
- Simple health check endpoint for server monitoring

## Tech Stack

- Frontend: React 18, Vite 6, Tailwind CSS 3
- Backend: Express 4, Nodemailer
- Tooling: PostCSS, Autoprefixer

## Getting Started

### 1) Install dependencies

```bash
npm install
```

### 2) Configure environment variables

Create a local .env file based on .env.example and provide real values:

```bash
cp .env.example .env
```

Required variables:

- EMAIL_HOST
- EMAIL_PORT
- EMAIL_USER
- EMAIL_PASS
- ADMIN_EMAIL
- PORT (optional, default 3001)
- VITE_API_BASE_URL (required for production builds)

### 3) Run the app

Frontend (Vite dev server):

```bash
npm run dev
```

Backend (Express contact server):

```bash
npm run server
```

The Vite dev server proxies /api requests to http://localhost:3001.

## API Endpoints

- GET /api/health
- POST /api/contact

## Build for Production

```bash
npm run build
npm run preview
```

## Deploy on Render

This repo includes a render.yaml that provisions two services:

- A Node web service for the contact API
- A static site for the frontend

Steps:

1) In Render, click New > Blueprint and connect this GitHub repo.
2) Apply the blueprint and wait for both services to be created.
3) In the API service, set env vars: EMAIL_HOST, EMAIL_PORT, EMAIL_USER, EMAIL_PASS, ADMIN_EMAIL.
4) In the static site, set VITE_API_BASE_URL to the API service URL (for example: https://your-api-service.onrender.com).
5) Redeploy the static site to pick up the env var.

If you prefer manual setup, create a Node web service using npm run server and a static site using npm run build with dist as the publish directory.

## Security Notes

- Do not commit real credentials. Keep .env files out of version control.
- Replace any placeholder values in .env.example with safe examples.

## Contributing

- Create a feature branch from main
- Use clear commit messages
- Open a pull request with context and screenshots when relevant

## License

Add your preferred license here (for example: MIT).
