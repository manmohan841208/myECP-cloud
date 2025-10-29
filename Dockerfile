# ---- Step 1: Build Stage ----
FROM node:20-bullseye AS builder

WORKDIR /app

# Install dependencies for sharp
RUN apt-get update && apt-get install -y \
  libvips-dev \
  build-essential \
  python3 \
  && rm -rf /var/lib/apt/lists/*

# Copy dependency files
COPY package.json package-lock.json* ./

# Install Node.js dependencies (include optional = sharp)
RUN npm ci --include=optional

# Copy rest of project files
COPY . .

# Build Next.js project
RUN npm run build

# ---- Step 2: Production Stage ----
FROM node:20-bullseye AS runner

WORKDIR /app
ENV NODE_ENV=production
ENV PORT=8080

# Copy runtime files from builder
COPY --from=builder /app ./

EXPOSE 8080
CMD ["npm", "start"]
