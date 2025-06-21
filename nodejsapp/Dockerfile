# Use a lightweight Node base image
FROM node:20-slim

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose port
EXPOSE 3000

# Start the app
CMD ["npm", "start"]
