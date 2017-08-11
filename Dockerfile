FROM node:8.2

MAINTAINER QEdu IT Team - <tech@qedu.org.br>

WORKDIR /usr/src/app

ARG ENV=stg

COPY . /usr/src/app

RUN yarn global add npm

RUN npm config set unsafe-perm=true \
    && npm i -g yarn \
    && npm i -g pm2 \
    && npm i -g @angular/cli@1.2 \
    && npm i -g webpack

COPY provision/entrypoint.sh /usr/local/bin
RUN chmod +x /usr/local/bin/entrypoint.sh

RUN yarn install

RUN yarn build:${ENV}

EXPOSE 4200

CMD yarn start
