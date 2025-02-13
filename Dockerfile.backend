# Use a compatible Node.js version for Angular 12
FROM node:14

# Create a directory for the frontend
RUN mkdir /frontend

# Set the working directory
WORKDIR /frontend

# Copy package.json and package-lock.json
COPY frontend/package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY frontend/ .

# Build the Angular application
RUN npm run build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY backend/package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY backend/ .

# Expose the port the backend runs on
EXPOSE 3000

# Start the backend server
CMD ["npm", "start"]