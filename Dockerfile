FROM node:slim

RUN apt-get update && apt-get install -y openssl libssl-dev

WORKDIR /jupiter.dedsec.cl
COPY ./package.json .
COPY ./dist .
COPY ./.env .
COPY ./prisma ./prisma
RUN npm install
EXPOSE 8643

CMD ["node", "./index.js"]
