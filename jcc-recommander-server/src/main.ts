// ts编译之后不会处理ts文件中的路径映射，需要借助module-alias解析编译后js文件中的路径别名。

const moduleAlias = require('module-alias')
moduleAlias.addAlias('@', __dirname)

import express from 'express'
import * as http from 'http'
import { config, Config } from '@/config/config'
import { initApp } from '@/boot/app'

async function launchServer(config: Config): Promise<http.Server> {
  const app: express.Express = express()

  initApp(app, config)

  const server = app.listen(config.port, () => {
    console.log(`web服务器已启动，监听端口: ${config.port}`)
  })

  return server
}

launchServer(config)

export { launchServer }
