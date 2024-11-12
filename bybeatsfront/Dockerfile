FROM node:16 as base

WORKDIR /app

COPY . /app
RUN npm install -D --force

EXPOSE 4200

CMD ["npm", "start"]