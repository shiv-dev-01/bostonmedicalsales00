# Boston Medical Sales Portal

A React-based sales and order management dashboard for Boston Medical. Built with Vite, TypeScript, and Tailwind CSS, this application lets sales teams create orders, manage coupons, and track order history through a secure admin interface.

## Features

- **Authentication** — Secure login with role-based access control
- **Order Management** — Create, view, and manage customer orders
- **Order by Email** — Dedicated workflow for email-based order lookup and creation
- **Coupon Management** — Create and apply promotional coupons
- **Multi Product Line Support** — Handles multiple product lines with separate API endpoints
- **Dashboard** — Overview of orders, customers, and sales metrics

## Tech Stack

| Category | Technologies |
|----------|-------------|
| Framework | React 18, TypeScript |
| Build Tool | Vite 5 |
| Styling | Tailwind CSS |
| State Management | Zustand |
| Routing | React Router v6 |
| Forms & Validation | React Hook Form, Zod |
| HTTP Client | Axios |
| UI Icons | Lucide React |

## Prerequisites

- [Node.js](https://nodejs.org/) 18 or higher
- npm (comes with Node.js)

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/shiv-dev-01/bostonmedicalsales00.git
cd bostonmedicalsales00
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npm run dev
```

The app will be available at `http://localhost:5173`.

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start the Vite development server |
| `npm run build` | Build the app for production |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint on the codebase |

## Project Structure

```
src/
├── assets/          # Images, logos, and static files
├── components/      # Reusable UI components
│   ├── auth/        # Login form and auth UI
│   ├── coupons/     # Coupon creation components
│   ├── layout/      # Dashboard layout, sidebar, top bar
│   ├── orders/      # Order form sections and cards
│   └── ui/          # Shared UI primitives
├── lib/
│   ├── api/         # API services and endpoints
│   ├── constants/   # Product line configuration
│   ├── hooks/       # Custom React hooks
│   ├── types/       # TypeScript type definitions
│   └── validations/ # Zod schemas
├── pages/           # Route-level page components
├── store/           # Zustand state stores
└── styles/          # Global styles
```

## API Configuration

The backend API base URL and site ID are configured in `src/lib/config.ts`:

```ts
export const API_BASE_URL = 'https://panel.whitelabelmd.com/bostonmedical';
export const SITE_ID = 131;
```

Update these values if you are pointing to a different environment.

## Building for Production

```bash
npm run build
```

Output is written to the `dist/` directory. Serve it with any static file host or use:

```bash
npm run preview
```

## License

Private — Boston Medical internal use.
