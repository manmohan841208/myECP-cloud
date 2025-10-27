# ---- Step 1: Build Stage ----
FROM node:20-bullseye AS builder

WORKDIR /app

# Copy only package.json (since package-lock.json is missing or out of sync)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your project files
COPY . .

# Build the Next.js app
RUN npm run build

# ---- Step 2: Production Stage ----
FROM node:20-bullseye AS runner
WORKDIR /app

# Copy only necessary files
COPY --from=builder /app/package*.json ./
RUN npm install --omit=dev

# Copy built app
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.* ./

# Environment and port for Cloud Run
ENV NODE_ENV=production
ENV PORT=8080
EXPOSE 8080

# Start command
CMD ["npm", "start"]
