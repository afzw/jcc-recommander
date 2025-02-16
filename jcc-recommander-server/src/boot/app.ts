import express from 'express'
import { initExpress } from './express'
import { makeLogDir } from './log'
import { Config } from '@/config/config'
import { initRouter } from './router'
import { initConfig } from './config'
import { initMongoose } from './mongoose'

/**
 * 初始化服务
 * @param app 应用程序
 */
async function initApp(app: express.Express, config: Config) {
  initConfig(config)
  await initMongoose()
  await makeLogDir()
  initExpress(app)
  initRouter(app)
}

export { initApp }
