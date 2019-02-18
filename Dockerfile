FROM node:8-alpine AS builder

WORKDIR /app

COPY package.json .
RUN npm i

COPY . .

RUN npm run prod

FROM nginx:alpine
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/build /usr/share/nginx/html
EXPOSE 3000
