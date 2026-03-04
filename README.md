# Naturopathy Portfolio

A modern, multilingual portfolio and consultation site for a naturopathy practice. The frontend is built with React + Vite + Tailwind CSS, and a lightweight Express server handles contact form submissions via SendGrid.

## Features

- Responsive, single-page experience with lazy-loaded sections
- Multilingual content with language context
- Themed UI with Tailwind CSS
- Contact form with validation and SendGrid email delivery
- Simple health check endpoint for server monitoring

## Tech Stack

- Frontend: React 18, Vite 6, Tailwind CSS 3
- Backend: Express 4, SendGrid Mail
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

- SENDGRID_API_KEY
- SENDGRID_FROM_EMAIL
- SENDGRID_TO_EMAIL
- PORT (optional, default 3001)

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

## Security Notes

- Do not commit real credentials. Keep .env files out of version control.
- Replace any placeholder values in .env.example with safe examples.

## Contributing

- Create a feature branch from main
- Use clear commit messages
- Open a pull request with context and screenshots when relevant

## License

Add your preferred license here (for example: MIT).
