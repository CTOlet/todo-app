FROM node:16-alpine
WORKDIR /app
COPY . .
RUN npm install
ENTRYPOINT npm run prisma:deploy && npm run start

