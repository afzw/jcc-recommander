import mongoose from 'mongoose'

export async function initMongoose() {
  try {
    await mongoose.connect('mongodb://root:root@localhost:27017/jcc-recommander-server?authSource=admin')
  } catch (e) {
    console.error('MongoDB 连接失败:', e)
  }
}
