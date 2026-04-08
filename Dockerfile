FROM oven/bun:latest AS development

WORKDIR /app

COPY package*.json bun.lock* ./
RUN bun install

COPY . .

EXPOSE 5173

CMD ["bun", "run", "dev", "--", "--host", "0.0.0.0"]

# Build stage
FROM oven/bun:latest AS builder

WORKDIR /app

COPY package*.json bun.lock* ./
RUN bun install --frozen-lockfile

COPY . .

RUN bun run build

# Production stage
FROM nginx:alpine AS production

COPY --from=builder /app/dist /usr/share/nginx/html

RUN rm /etc/nginx/conf.d/default.conf

COPY nginx.conf /etc/nginx/conf.d

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]