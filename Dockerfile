FROM node:18-alpine as build

WORKDIR /app
COPY package.json /app/package.json
RUN npm install --silent
COPY . .
RUN npm run build

FROM nginx:alpine as publish

COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
