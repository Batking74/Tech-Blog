FROM node:18.20-alpine
WORKDIR /app
COPY . .
EXPOSE 2000
CMD [ "npm", "start" ]