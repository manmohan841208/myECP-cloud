# ---- Step 1: Build Stage ----
FROM node:20-bullseye AS builder
 
# Set working directory
WORKDIR /app
 
# Copy package files first (for dependency caching)
COPY package.json package-lock.json* ./
 
# Always ensure fresh dependencies
RUN npm ci --no-cache
 
# Copy everything else
COPY . .
 
# Build the Next.js app
RUN npm run build
 
# ---- Step 2: Production Stage ----
FROM node:20-bullseye AS runner
WORKDIR /app
 
ENV NODE_ENV=production
ENV PORT=8080
 
# Copy only necessary parts
COPY --from=builder /app/package.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/next.config.* ./ || true
 
EXPOSE 8080
 
# Start the Next.js app
CMD ["npm", "start"]
