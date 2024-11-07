FROM node:18-alpine
COPY . .
EXPOSE 3003
RUN npm install 
CMD ["node", "src/index.js"]
