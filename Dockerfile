# Use the official Node.js image to build the app
FROM node:14 AS build
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

# Use the official Nginx image to serve the app
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
