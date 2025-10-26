# Step 1: Use an official Node.js image
FROM node:18-alpine AS builder
 
# Step 2: Set the working directory
WORKDIR /app
RUN npm i -D eslint-config-prettier
RUN npm install --save-dev @types/tailwindcss
 
# Step 3: Copy package files and install dependencies
COPY package*.json ./
RUN npm install
 
# Step 4: Copy all source code and build the Next.js app
COPY . .
RUN npm run build
 
# Step 5: Use a lightweight Node image for production
FROM node:18-alpine AS runner
WORKDIR /app
 
# Only copy necessary build output and dependencies
COPY --from=builder /app/package*.json ./
RUN npm install --omit=dev
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.js ./
 
# Set environment variable for Next.js
ENV NODE_ENV=production
EXPOSE 3000
 
# Start the app
CMD ["npm", "start"]
