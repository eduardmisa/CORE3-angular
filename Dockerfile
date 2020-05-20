FROM node:12.16.1

ENV HOST 0.0.0.0

RUN  mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY package.json /usr/src/app

RUN npm install

COPY . /usr/src/app

RUN npm run build:ssr

EXPOSE 4444

CMD ["npm run serve:ssr"]