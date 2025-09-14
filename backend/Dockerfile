FROM node:jb-alpine
WORKDIR /usr/src/app
USER 0:0
RUN chown -R node:node /usr/src/app
USER node:node
ENV PATH=/usr/src/app/node_modules/.bin:$PATH
COPY package.json /usr/src/app/package.json
RUN npm install
COPY ./dist /usr/src/app/dist
COPY ./views /usr/src/app/views
CMD ["npm", "run", "start"]
