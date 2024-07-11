FROM node:22.4.0-alpine AS base_image

FROM base_image AS dependencies

WORKDIR /app

COPY package-lock.json /app/package-lock.json
COPY package.json /app/package.json

RUN npm i

FROM base_image AS app

EXPOSE 4000

WORKDIR /app

COPY --from=dependencies /app/node_modules /app/node_modules
COPY conf/.env.development /app/.env

COPY . .

CMD [ "npm", "start", "dev" ]
