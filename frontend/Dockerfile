# Stage 1: The Build Environment
FROM node:18-alpine AS builder

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json to leverage Docker caching
COPY package.json package-lock.json ./

# Install all dependencies (including devDependencies)
RUN npm ci

# Copy the rest of your application code
COPY . .

# Run the Next.js build command
RUN npm run build

# Stage 2: The Production Environment
FROM node:18-alpine AS runner

# Set the working directory
WORKDIR /app

# Copy the build output and essential files from the builder stage
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/public ./public

# Expose the port Next.js runs on
EXPOSE 3000

# Set the command to run the application
CMD ["npm", "start"]
