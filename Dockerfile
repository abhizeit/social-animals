FROM node:18.20.3-alpine

RUN apk add --no-cache bash

WORKDIR /app

ARG AUTH_GITHUB_ID
ARG AUTH_GITHUB_SECRET
ARG NEXTAUTH_SECRET
ARG NEXTAUTH_URL
ARG NEXT_PUBLIC_SOCKET_SERVER_URL
ARG DATABASE_URL
ARG REDIS_URL
ARG REDIS_TOKEN

COPY . .

RUN npm install

RUN npx prisma generate

RUN npm run build

EXPOSE 8080

CMD ["npm", "start"]

