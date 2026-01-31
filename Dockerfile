# Dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --production

COPY . .

# Create data directory volume
VOLUME /app/data

# Default command
CMD ["node", "check.js"]
