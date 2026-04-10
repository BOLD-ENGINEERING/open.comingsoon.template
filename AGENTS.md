# AGENTS.md

## Architecture

This is a template-based project with three main components:
- **Polyfills**: Frontend frameworks in `polyfills/` (e.g., `ivue`, `inext`)
- **Server**: Express API backend in `server/`
- **Template**: Configuration in `template.yaml` that selects the active polyfill

## Execution

All commands run via the `oct` helper script:

**Local Development:**
- `bash oct dev` - Runs active polyfill + server concurrently (uses concurrently)
- `bash oct {script}` - Runs any script from polyfill's package.json
- `bash oct list` - Shows all polyfills, server, and active configuration
- `bash oct doctor` - Checks dependencies (Node, Bun, Docker, concurrently)

**Docker:**
- `bash oct docker dev` - Development container with hot reload
- `bash oct docker prod` - Production container
- `bash oct docker build` - Build Docker image

## Template Configuration

Edit `template.yaml` to change the active polyfill:
```yaml
polyfill:
  template: inext  # or ivue, etc.

server:
  store: true
  telemetry: true
```

## Requirements

- Node.js >= 22.22.2
- Bun
- Docker
- Concurrently (global install: `npm install -g concurrently`)

## Key Files

- `template.yaml` - Polyfill and server configuration
- `oct` - Command helper script
- `polyfills/` - Frontend framework implementations
- `server/` - Backend Express API
- `docker/` - Docker configuration