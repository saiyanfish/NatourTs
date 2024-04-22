FROM node:21

WORKDIR /app

COPY package*.json ./

RUN npm install --only=production

COPY . .

RUN npm install -g typescript

RUN tsc

ENV PORT=3000

EXPOSE 3000

CMD ["node", "dist/server.js"]
