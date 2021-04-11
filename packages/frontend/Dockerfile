# -- Build frontend -- #

FROM node:14-slim AS build0

WORKDIR /package-root

COPY package.json .
COPY yarn.lock .
COPY tsconfig.json .
COPY src src
COPY public public

RUN yarn install && yarn build

# -- NGINX -- #

FROM nginx:1.17

COPY --from=build0 /package-root/build /frontend
COPY nginx.conf /etc/nginx/nginx.conf

