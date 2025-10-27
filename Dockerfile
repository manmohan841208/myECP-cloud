# ---- Step 1: Build Stage ----
FROM node:20-bullseye AS builder

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./

# Use npm install (works when package-lock.json is missing or out-of-sync)
RUN npm install

# Copy the rest of the project files
COPY . .

# Build the Next.js app
RUN npm run build

# ---- Step 2: Production Stage ----
FROM node:20-bullseye AS runner
WORKDIR /app

# Copy only the built app and package files required for runtime
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.* ./

# Install only production deps
RUN npm install --omit=dev

# Cloud Run expects port 8080
ENV NODE_ENV=production
ENV PORT=8080
EXPOSE 8080

CMD ["npm", "start"]
