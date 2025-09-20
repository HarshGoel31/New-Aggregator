# Stage 1: Build
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files and install all dependencies (including dev)
COPY package*.json ./
RUN npm install --legacy-peer-deps

# Copy rest of app
COPY . .

# Optional: helps Node resolve ESM modules in TypeScript
ENV NODE_OPTIONS="--experimental-specifier-resolution=node"

# Build the project
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:alpine

# Copy built files to Nginx html directory
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
