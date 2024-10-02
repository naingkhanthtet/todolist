FROM node:16-alpine

WORKDIR /app

COPY package.json yarn.lock /app/
COPY public/ /app/public
COPY src/ /app/src

RUN npm install

EXPOSE 3000

CMD ["npm", "start"]