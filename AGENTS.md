# AGENTS.md

## Commands

- `bun run dev` - Start dev server
- `bun run build` - Run `type-check` then `build-only`
- `bun run test:unit` - Run vitest
- `bun run lint` - Runs both `lint:oxlint` and `lint:eslint`
- `bun run format` - Prettier write to src/
- `bun run type-check` - vue-tsc --build

## Tech Stack

- Vue 3 + TypeScript + Vite (Rolldown)
- Tailwind v4 with `@tailwindcss/vite` plugin
- PrimeVue with auto-import resolver
- Pinia for state management

## Quirks

- Node >= 24.14.1 required
- Lint runs two tools: `oxlint` then `eslint` (both with `--fix`)
- ESLint uses flat config (no `.eslintrc*` file)
- PrimeVue components auto-imported via `unplugin-vue-components`
- Alias `@` maps to `src/`
