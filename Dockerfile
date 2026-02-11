# Staging Dockerfile for AgentMe

# Use Node.js LTS as the base image
FROM node:20-slim

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy source code
COPY . .

# Install all dependencies and build
RUN npm install
RUN npm run build

# Set Environment Variables
ENV NODE_ENV=staging
ENV PORT=3000

# Expose the server port
EXPOSE 3000

# Run the server
CMD ["node", "dist/app.js"]
