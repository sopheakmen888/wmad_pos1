FROM node:20

# Set working directory
WORKDIR /usr/src/app

# Copy package files first (to leverage Docker cache)
COPY package*.json ./

# Install dependencies
RUN npm install --force

COPY . .

CMD [ "sh","-c","npm run db:generate && npm run dev"]
RUN npm run db:generate && npm run build

