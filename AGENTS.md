# AGENTS.md

## Commands

- `npm run dev` - Start dev server
- `npm run build` - Run `type-check` then `build-only`
- `npm run test:unit` - Run vitest
- `npm run lint` - Runs both `lint:oxlint` and `lint:eslint`
- `npm run format` - Prettier write to src/
- `npm run type-check` - vue-tsc --build
- `npm run preview` - Preview production build locally

## Docker

- `docker build -t comingsoon .` - Build Docker image
- `docker-compose up dev` - Start development container with hot reload
- `docker-compose up web` - Start production container

## Tech Stack

- Vue 3 + TypeScript + Vite (Rolldown)
- Tailwind v4 with `@tailwindcss/vite` plugin
- PrimeVue with auto-import resolver
- Pinia for state management

## Quirks

- Node >= 22.22.2 required (check engines in package.json)
- Lint runs two tools: `oxlint` then `eslint` (both with `--fix`)
- ESLint uses flat config (no `.eslintrc*` file)
- PrimeVue components auto-imported via `unplugin-vue-components`
- Alias `@` maps to `src/`
- Uses pnpm as package manager (check engines in package.json)
