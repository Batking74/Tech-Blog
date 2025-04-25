FROM node:lts-alpine3.21

WORKDIR /app

COPY package.json .

RUN npm i

COPY . .

EXPOSE 5000

CMD [ "npm", "start" ]