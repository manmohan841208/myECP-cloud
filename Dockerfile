# ---- Step 1: Build Stage ----
FROM node:20-bullseye AS builder
WORKDIR /app

# Copy package files
COPY package*.json ./

# Try npm ci (fast+deterministic). If it fails (no lock or mismatch), fall back to npm install.
# This avoids failing the build when package-lock.json is missing or out of sync.
RUN npm ci || npm install

# Copy the rest of the project files
COPY . .

# Build the Next.js app
RUN npm run build

# ---- Step 2: Production Stage ----
FROM node:20-bullseye AS runner
WORKDIR /app

# Copy only necessary built files and package info
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.* ./

# Install only production deps
RUN npm install --omit=dev

# Cloud Run expects PORT 8080
ENV NODE_ENV=production
ENV PORT=8080
EXPOSE 8080

CMD ["npm", "start"]
