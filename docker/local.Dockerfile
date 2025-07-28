# ========================================
# Base Image with Bun
# ========================================
FROM oven/bun:slim

# Set working directory
WORKDIR /app

# Install sharp system dependencies
RUN apt-get update && apt-get install -y \
    libc6 \
    libvips-dev \
    && rm -rf /var/lib/apt/lists/*

# Copy the entire repo into the container
COPY . .

# Set environment variables
ENV NODE_ENV=development
ENV NEXT_TELEMETRY_DISABLED=1
ENV VERCEL_TELEMETRY_DISABLED=1
ENV HOSTNAME=0.0.0.0
ENV PORT=3000

# Install dependencies
RUN bun install
WORKDIR /app/apps/workflow

# Expose the port
EXPOSE 3000

# Start the development server (you can change this to "bun run dev" or "next dev" if needed)
CMD ["bun", "run", "dev"]
