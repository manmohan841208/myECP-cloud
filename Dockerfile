# ---- Step 1: Build Stage ----
FROM node:20-bullseye AS builder
 
WORKDIR /app
 
# Copy entire project (not just package.json) to prevent caching issues
COPY . .
 
# Install dependencies freshly without using cache
RUN npm ci --no-cache || npm install --no-cache
 
# Build the Next.js app
RUN npm run build
 
# ---- Step 2: Production Stage ----
FROM node:20-bullseye AS runner
 
WORKDIR /app
 
# Copy only necessary files for production
COPY --from=builder /app/package*.json ./
 
# Install only production dependencies, without caching
RUN npm ci --omit=dev --no-cache || npm install --omit=dev --no-cache
 
# Copy production build and static assets
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.* ./   # Include config if exists
 
# Set environment variables for Cloud Run
ENV NODE_ENV=production
ENV PORT=8080
 
EXPOSE 8080
 
# ✅ Start Next.js (Cloud Run expects listening on $PORT)
CMD ["npm", "start"]
