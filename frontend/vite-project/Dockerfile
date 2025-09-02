
# Use a Node.js base image
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Build the React application
RUN npm run build

# Serve the application using a lightweight web server (e.g., Nginx or serve)
# For simplicity, we'll use 'serve' which is often installed with create-react-app
# If you prefer Nginx, you'd need a multi-stage build or a separate Nginx image.

# Install 'serve' globally
RUN npm install -g serve

# Expose the port the application will run on
EXPOSE 5000

# Command to run the application
CMD ["serve", "-s", "dist", "-l", "5000","npm", "start"]
