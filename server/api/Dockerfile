FROM node:16-alpine
WORKDIR /app
COPY . .
RUN npm install

# RUN npm run build
CMD npm run start

# initialize db using prisma schema
ENTRYPOINT npm run prisma:init


# production multi stage

# FROM node:16-alpine AS stage-1
# WORKDIR /app
# COPY . .
# RUN npm install
# RUN npm run build

# FROM node:16-alpine AS stage-2
# WORKDIR /app
# COPY --from=stage-1 ./app/dist ./dist
# COPY package*.json ./
# RUN npm install --production
# CMD npm run start

