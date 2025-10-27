# -----------------------------------------------------------
# STEP 1: Build Stage
# -----------------------------------------------------------
# Use Debian-based Node.js image to avoid sharp build issues
FROM node:20-bullseye AS builder
 
# Set working directory
WORKDIR /app
 
# Copy package files first (for caching)
COPY package*.json ./
 
# Install all dependencies including devDependencies
RUN npm ci
 
# Copy all source code
COPY . .
 
# Build the Next.js app
RUN npm run build
 
 
# -----------------------------------------------------------
# STEP 2: Production Runner
# -----------------------------------------------------------
FROM node:20-bullseye AS runner
 
WORKDIR /app
 
# Copy only the necessary files for runtime
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
 
# Install only production dependencies
RUN npm ci --omit=dev
 
# Set environment variables
ENV NODE_ENV=production
ENV PORT=3000
 
# Expose the application port
EXPOSE 3000
 
# Start the Next.js app
CMD ["npm", "start"]
