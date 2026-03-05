# Frontend Structure

This is the Next.js frontend for Subtitle AI.

## Folder Structure

- `app/` - Next.js App Router pages
  - `(auth)/` - Authentication pages (login, signup)
  - `(dashboard)/` - User dashboard pages
  - `(admin)/` - Admin dashboard pages
- `components/` - Reusable React components
- `lib/` - Utility functions and API client
- `styles/` - Global CSS and Tailwind config
- `contexts/` - React Context for state management
- `hooks/` - Custom React hooks
- `public/` - Static assets

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Technologies

- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- Axios
- Zustand
