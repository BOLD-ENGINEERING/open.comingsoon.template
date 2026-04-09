# Open Coming-Soon Template

A modern landing page template built for launch announcements, product previews, and pre-release campaigns. It includes built-in visitor analytics, email capture, and telemetry integration.

## Overview

This repository delivers a polished coming soon page with a focus on maintainability, extensibility, and observability. It is ideal for teams that want a launch-ready landing page with analytics and backend integrations already in place.

## Integrations

- **Supabase**: Stores subscriber emails, visitor IP data, and structured analytics records.
- **InfluxDB**: Optional time-series event pipeline for telemetry, allowing advanced tracking and dashboarding.
- **Social Click Tracking**: Tracks visitor interactions across social channels and aggregates click counts per IP.
- **Dark Mode / System Preference**: Supports user system theme preference plus a manual toggle.

## Agents

- For project agent and tooling context, see [AGENTS.md](./AGENTS.md).

## Features

- Responsive, professional coming soon UI
- Email collection with validation and backend persistence
- Social click analytics with per-visitor aggregation
- User preference-based dark mode support
- Reusable utility functions for API and telemetry operations

## Tech Stack

- Vue 3 + TypeScript
- Vite
- Tailwind CSS v4
- PrimeVue
- Pinia
- Supabase SDK
- InfluxDB integration

## Requirements

- Node >= 24.14.1
- Bun

## Notes

The project is structured for open-source use, with a clear separation between frontend UI, backend integration utilities, and analytics tracking. It is intended to be extended with additional integrations, custom branding, and deployment automation.

## License

See [LICENSE](./LICENSE).
