# Stage 1: The Build Environment
FROM node:18-alpine AS builder

# Set the working directory to the app's root inside the container
WORKDIR /app

# Copy package.json and package-lock.json to leverage Docker caching.
COPY package.json package-lock.json ./

# Install all dependencies (including devDependencies)
# Using `npm install` here to automatically fix any lock file inconsistencies.
RUN npm install

# Copy the rest of the application code
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
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/public ./public

# Expose the port Next.js runs on
EXPOSE 3000

# Set the command to run the application
CMD ["npm", "start"]


