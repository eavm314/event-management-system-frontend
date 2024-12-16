FROM node:20.18-alpine3.21

ENV NODE_ENV=production
ENV PORT=3000

WORKDIR /app

COPY package*.json ./   

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
