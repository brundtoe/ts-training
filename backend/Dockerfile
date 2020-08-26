FROM node:bbr
WORKDIR /usr/src/app
ENV PATH /usr/src/app/node_modules/.bin:$PATH
COPY package.json /usr/src/app/package.json
RUN npm install
COPY ./dist /usr/src/app/dist
COPY ./views /usr/src/app/views
CMD ["npm", "run", "start"]
