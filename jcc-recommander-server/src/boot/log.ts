import { config } from '@/config/config'
import callAsync from '@/lib/callAsync'
import { access, mkdir } from 'fs/promises'

/** 生成日志目录 */
async function makeLogDir() {
  const [errAccess] = await callAsync(access(config.logDir))
  if (!errAccess) return

  const [errMake] = await callAsync(mkdir(config.logDir, { recursive: true }))
  if (errMake) throw new Error(`程序启动时，生成日志目录失败，请重启程序，或者联系开发人员！`)
}

export { makeLogDir }
