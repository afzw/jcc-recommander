# 使用 Node.js 作为基础镜像
FROM node:20

RUN apt-get update && apt-get install -y python3 python3-pip python3.11-venv

# 设置工作目录
WORKDIR /app

# 复制 package.json 并安装依赖
COPY package.json package-lock.json ./
RUN npm i --production

# 复制全部后端代码
COPY . .

RUN npm run build

# 确保 Python 脚本有执行权限
RUN chmod +x scripts/hero-data-scrape.py

# 创建 Python 虚拟环境，并激活
RUN python3 -m venv /app/venv
RUN /app/venv/bin/pip install --upgrade pip
RUN /app/venv/bin/pip install playwright

# 安装 Playwright 需要的浏览器
RUN /app/venv/bin/python -m playwright install --with-deps

# 暴露端口
EXPOSE 9000

# 启动 Express 服务器
CMD ["/bin/sh", "-c", ". /app/venv/bin/activate && node dist/main.js"]