# Open Coming-Soon Template

A modern landing page template built for launch announcements, product previews, and pre-release campaigns. It includes built-in visitor analytics, email capture, and telemetry integration.

## Overview

This repository delivers a polished coming soon page with a focus on maintainability, extensibility, and observability. It is ideal for teams that want a launch-ready landing page with analytics and backend integrations already in place.

## Architecture

This is a template-based project with three main components:

- **Polyfills**: Frontend frameworks in `polyfills/` (e.g., `ivue`, `inext`)
- **Server**: Express API backend in `server/`
- **Template**: Configuration in `template.yaml` that selects the active polyfill

## Integrations

- **Supabase**: Stores subscriber emails, visitor IP data, and structured analytics records.
- **InfluxDB**: Optional time-series event pipeline for telemetry, allowing advanced tracking and dashboarding.
- **Social Click Tracking**: Tracks visitor interactions across social channels and aggregates click counts per IP.
- **Dark Mode / System Preference**: Supports user system theme preference plus a manual toggle.

## Features

- Responsive, professional coming soon UI
- Email collection with validation and backend persistence
- Social click analytics with per-visitor aggregation
- User preference-based dark mode support
- Reusable utility functions for API and telemetry operations

## Tech Stack

- Vue 3 + TypeScript
- Vite (Rolldown)
- Tailwind CSS v4
- PrimeVue
- Pinia
- Supabase SDK
- InfluxDB integration

## Getting Started

All commands run via the `oct` helper script:

```bash
# Local development (runs polyfill + server concurrently)
bash oct dev

# List available commands
bash oct list

# Check dependencies
bash oct doctor

# Docker
bash oct docker dev     # Development container
bash oct docker prod    # Production container
bash oct docker build   # Build Docker image
```

## Requirements

- Node.js >= 22.22.2
- Bun
- Docker
- Concurrently (`npm install -g concurrently`)

## Configuration

Edit `template.yaml` to change the active polyfill:

```yaml
polyfill:
  template: inext  # or ivue

server:
  store: true
  telemetry: true
```

## AI Models Used

This project was built with assistance from:

- **GLM-4.7** - Primary model for code generation and debugging
- **Qwen3-Thinking (High)** - Reasoning and complex problem solving
- **MiniMax M2.5** - Code review and optimization
- **NemotroN 3 Super** - Architecture decisions and best practices

## Agents

- For project agent and tooling context, see [AGENTS.md](./AGENTS.md).

## Notes

The project is structured for open-source use, with a clear separation between frontend UI, backend integration utilities, and analytics tracking. It is intended to be extended with additional integrations, custom branding, and deployment automation.

## License

See [LICENSE](./LICENSE).
