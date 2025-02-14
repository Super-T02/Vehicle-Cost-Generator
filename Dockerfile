# Stage 1: Build Stage
FROM node:lts-alpine AS build

# Create a directory for the frontend
RUN mkdir /frontend

# Set the working directory
WORKDIR /frontend

# Copy package.json and package-lock.json
COPY frontend/package*.json ./

# Install dependencies
RUN npm install --omit=dev

# Copy the rest of the application code
COPY frontend/ .

# Build the Angular application
RUN npm run build


# Stage 2: Production Stage
FROM node:lts-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY backend/package*.json ./

# Install dependencies
RUN npm install --omit=dev

# Copy the rest of the application code
COPY backend/ .

# Copy the built frontend from the build stage
COPY --from=build /frontend/dist /frontend/dist

# Expose the port the backend runs on
EXPOSE 3000

# Start the backend server
CMD ["npm", "start"]