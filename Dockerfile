FROM node:18-alpine

WORKDIR /low-code-modeler

RUN npm install -g pnpm

COPY package*.json ./
 
RUN pnpm install
 
COPY . .
 
EXPOSE 4242
 
CMD ["npm", "run", "exposed-port"]