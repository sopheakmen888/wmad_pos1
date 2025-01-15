<<<<<<< HEAD
=======

>>>>>>> supplier
FROM node:20

WORKDIR /usr/src/app


COPY package*.json ./

RUN npm install --force

COPY . .

<<<<<<< HEAD

CMD [ "sh","-c","npm run db:generate && npm run dev"]
=======
CMD [ "sh","-c","npm run db:generate && npm run dev"]


>>>>>>> supplier
