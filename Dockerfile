# ---- Step 1: Build Stage ----
FROM node:20-bullseye AS builder

WORKDIR /app

# Install dependencies for sharp and other native modules
RUN apt-get update && apt-get install -y \
  libvips-dev \
  build-essential \
  python3 \
  && rm -rf /var/lib/apt/lists/*

# Copy dependency files
COPY package.json package-lock.json* ./

# Install Node modules (include optional like sharp)
RUN npm ci --include=optional

# ✅ Rebuild sharp specifically for Linux
RUN npm rebuild sharp --force

# Copy env and source files
COPY . .

# ✅ Copy environment file explicitly (choose the one your app uses)
COPY .env.local .env

# Build Next.js project
RUN npm run build

# ---- Step 2: Production Stage ----
FROM node:20-bullseye AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=8080

COPY --from=builder /app ./

EXPOSE 8080

CMD ["npm", "start"]
