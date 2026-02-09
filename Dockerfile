# Staging Dockerfile for AgentMe

# Use Node.js LTS as the base image
FROM node:20-slim

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy source code and compiled files
# (Staging requires both per user request)
COPY src/ ./src/
COPY dist/ ./dist/
COPY knowledge/ ./knowledge/

# Set Environment Variables
ENV NODE_ENV=staging
ENV PORT=3000

# Expose the server port
EXPOSE 3000

# Run the server
# Using node directly on the compiled app.js
CMD ["node", "dist/app.js"]
