# ========================================
# Dependencies Stage: Install Dependencies
# ========================================
FROM oven/bun:slim AS deps
WORKDIR /app

# Update apt and install any required packages if needed
RUN apt-get update && apt-get install -y libc6 && rm -rf /var/lib/apt/lists/*

# Copy package files needed for dependency installation
COPY package.json bun.lock turbo.json ./
COPY apps/workflow/package.json ./apps/workflow/db/

# Install minimal dependencies in one layer
RUN bun install --omit dev --ignore-scripts && \
    bun install --omit dev --ignore-scripts drizzle-kit drizzle-orm postgres next-runtime-env zod @t3-oss/env-nextjs

# ========================================
# Runner Stage: Production Environment
# ========================================
FROM oven/bun:slim AS runner
WORKDIR /app

# Copy node_modules from deps stage
COPY --from=deps /app/node_modules ./node_modules

# Copy necessary app files
COPY apps/workflow/drizzle.config.ts ./apps/workflow/drizzle.config.ts
COPY apps/workflow/db ./apps/workflow/db
COPY apps/workflow/package.json ./apps/workflow/package.json
COPY apps/workflow/lib/env.ts ./apps/workflow/lib/env.ts

WORKDIR /app/apps/workflow
