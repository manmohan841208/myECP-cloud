# ---- Step 1: Build Stage ----
FROM node:20-bullseye AS builder

WORKDIR /app

# Install dependencies needed for sharp
RUN apt-get update && apt-get install -y \
  libvips-dev \
  build-essential \
  python3 \
  && rm -rf /var/lib/apt/lists/*

# Copy dependency files first
COPY package*.json ./

# Force clean install of all dependencies for Linux
RUN rm -rf node_modules package-lock.json && \
    npm cache clean --force && \
    npm install --include=optional

# Copy rest of project
COPY . .

# Copy environment file if required
COPY .env.local .env

# Build Next.js project
RUN npm run build

# ---- Step 2: Production Stage ----
FROM node:20-bullseye AS runner
WORKDIR /app

# Copy only built output and node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules

ENV NODE_ENV=production
ENV PORT=8080

EXPOSE 8080

CMD ["npm", "start"]
