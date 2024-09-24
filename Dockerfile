FROM node:20

WORKDIR /usr/src/app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 80

CMD ["npm", "run", "serve"]