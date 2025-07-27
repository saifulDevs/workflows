# ========================================
# Dependencies Stage: Install Dependencies
# ========================================
FROM oven/bun:alpine AS deps
WORKDIR /app

# Copy only package files needed for migrations
COPY package.json bun.lock turbo.json ./
COPY apps/workflow/package.json ./apps/workflow/db/

# Install minimal dependencies in one layer
RUN bun install --omit dev --ignore-scripts && \
    bun install --omit dev --ignore-scripts drizzle-kit drizzle-orm postgres next-runtime-env zod @t3-oss/env-nextjs

# ========================================
# Runner Stage: Production Environment
# ========================================
FROM oven/bun:alpine AS runner
WORKDIR /app

# Copy only the necessary files from deps
COPY --from=deps /app/node_modules ./node_modules
COPY apps/workflow/drizzle.config.ts ./apps/workflow/drizzle.config.ts
COPY apps/workflow/db ./apps/workflow/db
COPY apps/workflow/package.json ./apps/workflow/package.json
COPY apps/workflow/lib/env.ts ./apps/workflow/lib/env.ts

WORKDIR /app/apps/workflow