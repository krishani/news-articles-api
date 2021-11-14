FROM node:12.13.0-alpine
MAINTAINER Krishani;

RUN mkdir -p /tmp/rest-api
COPY ./ /tmp/rest-api
WORKDIR /tmp/rest-api

RUN npm install

EXPOSE 4000

CMD [ "npm", "run", "start" ]
