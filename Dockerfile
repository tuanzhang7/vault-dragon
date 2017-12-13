# Create image based on the official Node 8 image from dockerhub
FROM node:8.9.3-alpine

# Create a directory where our app will be placed
RUN mkdir -p /usr/src/app

# Change directory so that our commands run inside this new directory
WORKDIR /usr/src/app

ENV NODE_PATH=/usr/local/lib/node_modules/:/usr/local/lib  NODE_ENV=production
# Copy dependency definitions
COPY package.json /usr/src/app

# Install dependecies
RUN npm install --production --quiet

# RUN npm install --global gulp-cli
# Get all the code needed to run the app
COPY ./dist /usr/src/app

# Serve the app
CMD ["npm", "run", "start"]

# Expose the port the app runs in
EXPOSE 3000
