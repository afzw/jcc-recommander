import { config } from '@/config/config'
import mongoose from 'mongoose'

const connectWithRetry = () => {
  mongoose
    .connect(config.mongoUri)
    .then(() => console.log('✅ MongoDB 连接成功！'))
    .catch((err) => {
      console.error('⚠️ MongoDB 连接失败，5 秒后重试...', err)
      setTimeout(connectWithRetry, 5000) // 5 秒后重试
    })
}

// 启动连接
export async function initMongoose() {
  connectWithRetry()
}
