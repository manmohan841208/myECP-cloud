# =========================================
# Stage 1: Build
# =========================================
FROM node:20-bullseye AS builder

WORKDIR /app

# Install sharp dependencies early
RUN apt-get update && apt-get install -y \
  libvips-dev \
  build-essential \
  python3 \
  && rm -rf /var/lib/apt/lists/*

# Copy dependency files first (for smarter caching)
COPY package*.json ./

# Clean cache and install dependencies freshly
RUN npm cache clean --force && \
    rm -rf node_modules package-lock.json && \
    npm install --include=optional && \
    npm rebuild sharp --platform=linux --arch=x64 --libc=glibc

# Copy rest of the app
COPY . .

# Copy environment variables (if available)
COPY .env.local .env

# Build Next.js app
RUN npm run build

# =========================================
# Stage 2: Runtime
# =========================================
FROM node:20-bullseye AS runner
WORKDIR /app

ENV NODE_ENV=development
ENV PORT=8080

# Copy production artifacts only
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules

# Use a .dockerignore to skip unnecessary files (improves speed)
# Example: .git, node_modules/, .next/cache/, test files

EXPOSE 8080

CMD ["npm", "start"]
