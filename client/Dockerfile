FROM node:14-alpine
WORKDIR /app
COPY . .
RUN npm install
CMD npm run start

# production multi stage

# FROM node:14-alpine AS stage-1
# WORKDIR /app
# COPY . .
# RUN npm install
# RUN npm run build

# FROM node:14-alpine AS stage-2
# WORKDIR /app
# COPY --from=stage-1 ./app/dist ./dist
# COPY package*.json ./
# RUN npm install --production
# CMD npm run start