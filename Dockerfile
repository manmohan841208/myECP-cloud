# ---- Step 1: Build Stage ----
FROM node:20-bullseye AS builder

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the project files
COPY . .

# Build the Next.js app
RUN npm run build

# ---- Step 2: Production Stage ----
FROM node:20-bullseye AS runner
WORKDIR /app

# Copy only necessary files for runtime
COPY --from=builder /app/package*.json ./
RUN npm install --omit=dev

# Copy built app and configs
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.* ./

ENV NODE_ENV=production
EXPOSE 3000

CMD ["npm", "start"]
