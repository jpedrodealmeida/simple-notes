FROM node:latest as angular
WORKDIR /app
COPY package.json /app
RUN npm install --silent
COPY . .
RUN npm run build

FROM nginx:alpine
VOLUME /var/cache/nginx
COPY --from=angular app/dist/simple-notes /usr/share/nginx/html
COPY ./config/nginx.conf /etc/ngix/conf.d/default.conf

#docker build -t simple-notes .

#docker run -p 8081:80 simple-notes