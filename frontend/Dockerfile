# Stage 1: The Build Environment
FROM node:18-alpine AS builder

# Set the working directory
WORKDIR /app

# Copy package.json, package-lock.json, and yarn.lock (if applicable)
COPY package.json package-lock.json ./

# Install all dependencies (including devDependencies)
# Using `npm install` here to automatically fix any lock file inconsistencies.
RUN npm install

# Copy the rest of your application code
COPY . .

# Run the Next.js build command
RUN npm run build

# Stage 2: The Production Environment
FROM node:18-alpine AS runner

# Set the working directory
WORKDIR /app

# Copy only the necessary files for a production environment
# This significantly reduces the final image size.
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json

# Install only production dependencies in the final image
RUN npm ci --only=production

# Expose the port Next.js runs on
EXPOSE 3000

# Set the command to run the application
CMD ["npm", "start"]
