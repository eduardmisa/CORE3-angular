FROM node:12.2.0 as build

WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json /app/package.json
RUN npm install
RUN npm install -g @angular/cli@7.3.9
COPY . /app
RUN ng build --prod --output-path=dist

FROM nginx:1.16.0-alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 8888
CMD ["nginx", "-g", "daemon off;"]