# ---- Step 1: Build Stage ----
FROM node:20-bullseye AS builder

WORKDIR /app

# Install dependencies required for sharp and other native modules
RUN apt-get update && apt-get install -y --no-install-recommends \
    libvips-dev build-essential python3 \
    && rm -rf /var/lib/apt/lists/*

# Copy dependency files first
COPY package*.json ./

# Clean install all modules (including sharp)
RUN npm ci --include=optional

# Rebuild sharp specifically for Linux (prevents runtime mismatch)
RUN npm rebuild sharp --force

# Copy rest of the app
COPY . .

# Copy environment file (explicitly for Next.js)
COPY .env.local .env

# Build the Next.js project
RUN npm run build

# ---- Step 2: Production Stage ----
FROM node:20-bullseye AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=8080

# Copy app from builder
COPY --from=builder /app ./

# Expose the port Cloud Run expects
EXPOSE 8080

# Start the app
CMD ["npm", "start"]
