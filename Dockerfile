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

ENV AUTH_GITHUB_ID=${AUTH_GITHUB_ID}
ENV AUTH_GITHUB_SECRET=${AUTH_GITHUB_SECRET}
ENV NEXTAUTH_SECRET=${NEXTAUTH_SECRET}
ENV NEXTAUTH_URL=${NEXTAUTH_URL}
ENV NEXT_PUBLIC_SOCKET_SERVER_URL=${NEXT_PUBLIC_SOCKET_SERVER_URL}
ENV DATABASE_URL=${DATABASE_URL}
ENV REDIS_URL=${REDIS_URL}
ENV REDIS_TOKEN=${REDIS_TOKEN}

COPY . .

RUN npm install

RUN npx prisma generate

RUN npm run build

EXPOSE 8080

CMD ["npm", "start"]

