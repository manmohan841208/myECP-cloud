# ---- Step 1: Build Stage ----
FROM node:20-bullseye AS builder

WORKDIR /app

# Install system dependencies for sharp
RUN apt-get update && apt-get install -y \
  libvips-dev \
  build-essential \
  python3 \
  && rm -rf /var/lib/apt/lists/*

# Copy package files first for better caching
COPY package*.json ./

# Force clean install of dependencies for Linux
RUN rm -rf node_modules package-lock.json && \
    npm cache clean --force && \
    npm install --include=optional && \
    npm rebuild sharp --platform=linux --arch=x64 --libc=glibc

# Copy all source code
COPY . .

# Copy environment variables if needed
COPY .env.local .env

# Build Next.js
RUN npm run build

# ---- Step 2: Production Stage ----
FROM node:20-bullseye AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=8080

# Copy built artifacts
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 8080
CMD ["npm", "start"]
