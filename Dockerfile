# Use Node.js as the base image for building the application
FROM node:16 AS builder

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies using npm ci for a deterministic build
RUN npm ci

# Copy the rest of the project files to the working directory
COPY . .

# Build the Docusaurus application
RUN npm run build

# Use Nginx as the base image for the production stage
FROM nginx:alpine

# Copy the built files from the previous stage to the Nginx html directory
COPY --from=builder /app/build /usr/share/nginx/html

# Expose port 80 to allow incoming HTTP traffic
EXPOSE 80

# Run Nginx in the foreground when the container starts
CMD ["nginx", "-g", "daemon off;"]