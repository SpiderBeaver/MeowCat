FROM node:15

WORKDIR /app
COPY ./build .

CMD ["node", "./dist/index.js"]