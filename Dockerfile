FROM node:18 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:18
WORKDIR /app
COPY --from=build /app/dist ./dist
RUN npm install -g json-server
COPY package*.json ./
RUN npm install
COPY . .

EXPOSE 3000 8080
CMD ["npm", "run", "start:both"]
