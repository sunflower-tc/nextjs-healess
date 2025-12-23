# Multi-stage build for Next.js application

# ============================================
# Stage 1: Dependencies
# ============================================
FROM node:20.11-alpine AS deps
RUN apk add --no-cache libc6-compat python3 make g++

WORKDIR /app

# Copy package files
COPY package.json package-lock.json* ./
COPY lingui.config.js ./

# Install dependencies
RUN npm ci --only=production --ignore-scripts

# ============================================
# Stage 2: Builder
# ============================================
FROM node:20.11-alpine AS builder
RUN apk add --no-cache libc6-compat python3 make g++

WORKDIR /app

# Copy package files
COPY package.json package-lock.json* ./
COPY lingui.config.js ./

# Install all dependencies (including devDependencies for build)
RUN npm ci --ignore-scripts

# Copy source code
COPY . .

# Build arguments for environment variables
ARG NEXT_PUBLIC_ADYEN_CLIENT_KEY
ARG MAGENTO_ENDPOINT
ARG NEXT_SERVER_MAGENTO_DEFAULT_STORE_CODE
ARG NEXTAUTH_SECRET
ARG NEXTAUTH_URL

# Set environment variables for build
ENV NEXT_PUBLIC_ADYEN_CLIENT_KEY=$NEXT_PUBLIC_ADYEN_CLIENT_KEY
ENV MAGENTO_ENDPOINT=$MAGENTO_ENDPOINT
ENV NEXT_SERVER_MAGENTO_DEFAULT_STORE_CODE=$NEXT_SERVER_MAGENTO_DEFAULT_STORE_CODE
ENV NEXTAUTH_SECRET=$NEXTAUTH_SECRET
ENV NEXTAUTH_URL=$NEXTAUTH_URL
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Build the application
RUN npm run build

# ============================================
# Stage 3: Runner
# ============================================
FROM node:20.11-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Create non-root user
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Copy necessary files from builder and deps
COPY --from=deps /app/node_modules ./node_modules
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/package.json ./package.json

# Set ownership
RUN chown -R nextjs:nodejs /app

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Start the application
CMD ["npm", "start"]
