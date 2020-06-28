FROM node:12.18.0

ENV HOST 0.0.0.0

RUN  mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY package.json /usr/src/app

RUN npm install -g @angular/cli

RUN npm install

COPY . /usr/src/app

# RUN npm run build:ssr

EXPOSE 6000

CMD ["node","dist/CORE-angular10/server/main.js"]