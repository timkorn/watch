FROM node
WORKDIR /usr/src/app
COPY ./server /usr/src/app
RUN npm install
CMD "npm" "start"