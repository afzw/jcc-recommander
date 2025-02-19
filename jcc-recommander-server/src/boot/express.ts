import express from 'express'
import morgan from 'morgan'
import compression from 'compression'
import cors from 'cors'
import dayjs from 'dayjs'

import { config } from '@/config/config'

/**
 * 【初始化】加载express程序
 * @param app 初始的express程序
 */
function initExpress(app: express.Express) {
  /** 跨域资源共享 */
  app.use(cors())

  app.set('x-powered-by', false)

  /** 配置express静态资源目录 */
  app.use(express.static(config.publicDir))
  /** HTTP request logger */
  morgan.token('date', () => dayjs().format('YYYY/MM/DD HH:mm:ss'))
  /** 日志记录 */
  app.use(morgan(':date :method :url -- [:status] :response-time ms'))
  /** response压缩 */
  app.use(compression())
  // 解析 application/x-www-form-urlencoded
  app.use(express.urlencoded({ extended: true }))
  // 解析 application/json
  app.use(express.json())
}

export { initExpress }
