# ========================================
# Base Stage: Slim Linux with Bun (Debian-based)
# ========================================
FROM oven/bun:slim AS base

# Update and install libc6-compat if needed (usually pre-installed in Debian slim)
RUN apt-get update && apt-get install -y libc6 && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# ========================================
# Dependencies Stage: Install Dependencies
# ========================================
FROM base AS deps

# Install turbo globally
RUN bun install -g turbo

COPY package.json bun.lock ./
RUN mkdir -p apps
COPY apps/workflow/package.json ./apps/workflow/package.json

RUN bun install --omit dev --ignore-scripts

# ========================================
# Builder Stage: Build the Application
# ========================================
FROM base AS builder

# Install turbo globally
RUN bun install -g turbo

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN bun install --omit dev --ignore-scripts

WORKDIR /app/apps/workflow
RUN bun install sharp

ENV NEXT_TELEMETRY_DISABLED=1 \
    VERCEL_TELEMETRY_DISABLED=1 \
    DOCKER_BUILD=1

WORKDIR /app
RUN bun run build

# ========================================
# Runner Stage: Run the actual app
# ========================================
FROM base AS runner

WORKDIR /app

ENV NODE_ENV=production

COPY --from=builder /app/apps/workflow/public ./apps/workflow/public
COPY --from=builder /app/apps/workflow/.next/standalone ./
COPY --from=builder /app/apps/workflow/.next/static ./apps/workflow/.next/static

EXPOSE 3000
ENV PORT=3000 \
    HOSTNAME="0.0.0.0"

CMD ["bun", "apps/workflow/server.js"]
