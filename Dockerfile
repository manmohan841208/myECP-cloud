# ---- Step 1: Build Stage ----
FROM node:20-bullseye AS builder

WORKDIR /app

# Copy package.json (ignore package-lock.json if not present)
COPY package.json ./

# Install dependencies
RUN npm install

# Copy rest of the project
COPY . .

# Build the Next.js app
RUN npm run build

# ---- Step 2: Production Stage ----
FROM node:20-bullseye AS runner
WORKDIR /app

# Copy only required files
COPY --from=builder /app/package.json ./
RUN npm install --omit=dev

# Copy production build
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

ENV NODE_ENV=production
ENV PORT=8080

EXPOSE 8080

# ✅ Start Next.js on the Cloud Run expected port
CMD ["npm", "start"]
