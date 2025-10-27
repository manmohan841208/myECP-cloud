# ---- Step 1: Build Stage ----
FROM node:20-bullseye AS builder

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./

# ✅ Auto-fix minor JSON syntax issue (missing comma) before npm install
RUN sed -i 's/fi\"/fi\",/' package.json

RUN npm install

# Copy the rest of the project files
COPY . .

# Build the Next.js app
RUN npm run build

# ---- Step 2: Production Stage ----
FROM node:20-bullseye AS runner
WORKDIR /app

COPY --from=builder /app/package*.json ./
RUN npm install --omit=dev

COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.* ./

ENV NODE_ENV=production
ENV PORT=8080          # ✅ Add this line for Cloud Run
EXPOSE 8080            # ✅ Cloud Run expects port 8080

CMD ["npm", "start"]
