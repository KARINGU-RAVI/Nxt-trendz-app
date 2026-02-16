# Build stage
FROM node:18-alpine AS builder

WORKDIR /app

# Set Node options to use legacy OpenSSL provider for Webpack 4 compatibility
ENV NODE_OPTIONS=--openssl-legacy-provider

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Build the React app
RUN npm run build

# Production stage
FROM node:18-alpine

WORKDIR /app

# Set Node options to use legacy OpenSSL provider
ENV NODE_OPTIONS=--openssl-legacy-provider

# Install serve to run the production build
RUN npm install -g serve

# Copy built app from builder stage
COPY --from=builder /app/build ./build
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json

# Expose port 3000
EXPOSE 3000

# Set environment to production
ENV NODE_ENV=production

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000', (r) => {if (r.statusCode !== 200) throw new Error(r.statusCode)})"

# Start the app
CMD ["serve", "-s", "build", "-l", "3000"]
