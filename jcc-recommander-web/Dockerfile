# 使用node.js作为构建环境
FROM node:20 AS builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm i

COPY . .
RUN npm run build

# 使用nginx作为web服务器
FROM nginx:latest

COPY --from=builder /app/dist /usr/share/nginx/html

COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]