FROM node:16-alpine

# Create app directory
RUN mkdir -p /app
WORKDIR /app

# Install app dependencies
COPY package.json /app
COPY package-lock.json /app
COPY .env /app
RUN npm install

# Bundle app source
COPY . /app
RUN npm run build

CMD [ "npm", "start" ]