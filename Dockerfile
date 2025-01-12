FROM node:18-alpine AS builder

WORKDIR /app
COPY package*.json ./
COPY tsconfig*.json ./
RUN npm install

COPY /prisma ./
RUN npm run db:generate

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]