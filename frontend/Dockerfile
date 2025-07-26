# Stage 1: The Build Environment
FROM node:18-alpine AS builder

# Set the working directory to the application's root inside the container
WORKDIR /app

# Copy the entire frontend directory from the build context
# This is crucial as it correctly locates the frontend folder.
COPY ./frontend ./frontend

# Change the working directory to the frontend folder for all subsequent commands
WORKDIR /app/frontend

# Copy package.json and package-lock.json to leverage Docker caching.
# Note: These files are now copied from within the `/app/frontend` WORKDIR.
COPY package.json package-lock.json ./

# Install all dependencies (including devDependencies)
# Using `npm install` here to automatically fix any lock file inconsistencies.
RUN npm install

# Run the Next.js build command
RUN npm run build

# Stage 2: The Production Environment
FROM node:18-alpine AS runner

# Set the working directory
WORKDIR /app/frontend

# Copy only the necessary files for a production environment
# This significantly reduces the final image size.
COPY --from=builder /app/frontend/.next ./.next
COPY --from=builder /app/frontend/public ./public
COPY --from=builder /app/frontend/package.json ./package.json
COPY --from=builder /app/frontend/package-lock.json ./package-lock.json

# Install only production dependencies in the final image
RUN npm ci --only=production

# Expose the port Next.js runs on
EXPOSE 3000

# Set the command to run the application
CMD ["npm", "start"]

