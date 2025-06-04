FROM node:20-slim

WORKDIR /app

COPY package*.json ./
RUN npm install -g npm@8
RUN npm cache clean --force && npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
