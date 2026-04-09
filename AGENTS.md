# AGENTS.md

## Execution Methods

You can run this project either locally or via Docker:

**Local (requires Node.js >= 22.22.2 and pnpm):**

- `npm run dev` - Start dev server
- `npm run build` - Run `type-check` then `build-only`
- `npm run test:unit` - Run vitest
- `npm run lint` - Runs both `lint:oxlint` and `lint:eslint` (both with --fix)
- `npm run format` - Prettier write to src/
- `npm run type-check` - vue-tsc --build
- `npm run preview` - Preview production build locally

**Docker:**

- `docker build -t comingsoon .` - Build Docker image
- `docker-compose up dev` - Start development container with hot reload
- `docker-compose up web` - Start production container

**Helper Script:**

- `bash oct {command}` - Run npm scripts (e.g., `bash oct dev`)
- `bash oct docker {command}` - Run Docker commands (e.g., `bash oct docker dev`)
- `bash oct doctor` - Check system dependencies
- `bash oct list` - List available npm scripts
- `bash oct help` - Show help message

## Tech Stack

- Vue 3 + TypeScript + Vite (Rolldown)
- Tailwind v4 with `@tailwindcss/vite` plugin
- PrimeVue with auto-import resolver
- Pinia for state management
- Supabase client (via @supabase/supabase-js)

## Quirks

- Node >= 22.22.2 required (check engines in package.json)
- pnpm >= 10.28.0 required (check engines in package.json)
- Lint runs two tools: `oxlint` then `eslint` (both with --fix)
- ESLint uses flat config (no `.eslintrc*` file)
- PrimeVue components auto-imported via `unplugin-vue-components`
- Alias `@` maps to `src/`
- Uses `@` alias in templates/styles (not just JS/TS)
- Supabase integration requires URL/ANON_KEY in environment
- Built with Rolldown (Vite's new bundler) - check vite.config.ts
