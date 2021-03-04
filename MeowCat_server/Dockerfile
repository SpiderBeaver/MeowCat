FROM node:15

WORKDIR /app
COPY ./dist ./dist
COPY ./.env ./.env
COPY ./package.json ./package.json

RUN npm install --production

CMD node ./dist/index.js