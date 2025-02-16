// 使用dotenv将.env文件中的环境变量注入到process.env中。详见：https://www.npmjs.com/package/dotenv
// 通过命令行直接给出的环境变量会覆盖.env文件中的环境变量，因此.env文件中的环境变量应该是默认值。
import 'dotenv/config'
import { Config } from '@/config/config'
import path from 'path'

/** 初始化系统配置 */
function initConfig(config: Config) {
  const rootDir = process.cwd()

  config.host = process.env.HOST || '127.0.0.1'
  config.port = Number(process.env.PORT) || 9000
  config.logDir = path.resolve(rootDir, process.env.LOG_DIR || 'logs')
  config.publicDir = path.resolve(rootDir, process.env.PUBLIC_DIR || 'public')
  config.uploadDir = path.resolve(rootDir, process.env.UPLOAD_DIR || 'uploads')
  config.scriptDir = path.resolve(rootDir, process.env.SCRIPT_DIR || 'scripts')
}

export { initConfig }
