# STAGE 1: Builder (Control Plane)
FROM node:20-slim AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
# Generate project documentation
RUN npm run build:context
# Build the application
RUN npm run build

# STAGE 2: Runner (Data Plane)
FROM node:20-slim AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000

# Copy built assets and knowledge artifacts
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/knowledge ./knowledge
COPY --from=builder /app/package*.json ./

# Install production dependencies only
RUN npm install --only=production

EXPOSE 3000
CMD ["node", "dist/app.js"]
