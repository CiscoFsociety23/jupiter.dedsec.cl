FROM node:slim

RUN apt-get update && apt-get install -y openssl libssl-dev

WORKDIR /jupiter.dedsec.cl
COPY . .
RUN npm i -g nodemon
RUN npm i
EXPOSE 8643

CMD ["nodemon", "src/index.ts"]
