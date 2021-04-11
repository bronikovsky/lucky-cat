FROM node:14-slim

WORKDIR /package-root

ARG TEST
ENV TEST $TEST

COPY package.json .
COPY yarn.lock .
COPY .env .
COPY build build

RUN /bin/bash -c '[[ $TEST != '' ]] && export NODE_ENV=test'
ENV NODE_ENV=${NODE_ENV:-production}

RUN $TEST && yarn install || yarn install --prod

CMD [ "node", "./build" ]
