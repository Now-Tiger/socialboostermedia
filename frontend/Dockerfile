# Stage 1: The Build Environment
FROM node:18-alpine AS builder

# Set the working directory to the root of the application
WORKDIR /app

# Copy the frontend folder and its contents
COPY ./frontend ./frontend

# Change the working directory to the frontend folder
WORKDIR /app/frontend

# Copy package.json and package-lock.json from the builder context
# to leverage Docker caching.
COPY package.json package-lock.json ./

# Install all dependencies (including devDependencies)
# Using `npm install` here to automatically fix any lock file inconsistencies.
RUN npm install

# Run the Next.js build command
RUN npm run build

# Stage 2: The Production Environment
FROM node:18-alpine AS runner

# Set the working directory
WORKDIR /app

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


