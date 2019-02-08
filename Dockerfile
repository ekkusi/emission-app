FROM node:10.15-jessie

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

RUN mkdir client && mkdir backend

COPY package.json ./

RUN npm install

COPY backend ./backend

WORKDIR /usr/src/app/client

COPY client/package.json ./

RUN npm install

COPY client ./

RUN npm run build

WORKDIR /usr/src/app

CMD ["node", "backend/server.js"]