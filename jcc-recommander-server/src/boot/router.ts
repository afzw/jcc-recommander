import express from 'express'
import { Route } from '@/routes/app'
import HeroRoutes from '@/routes/hero'
import LineupRoutes from '@/routes/lineup'

const routesMap = new Map<string, Route>()

async function initRouter(app: express.Express) {
  const appRouter = express.Router()
  registerRoutes(appRouter, HeroRoutes)
  registerRoutes(appRouter, LineupRoutes)
  app.use('/', appRouter)
}

/**
 * 路由注册
 * @description 解构路由信息, 注册到express路由器中
 * @param {express.Router} router - express router
 * @param {Route[]} routes - 路由信息
 */
function registerRoutes(router: express.Router, routes: Route[]) {
  for (const route of routes) {
    //  路由校验
    const key = `${route.method}:${route.path}`
    if (routesMap.has(key)) console.error(`重复的路由${key}`)
    routesMap.set(key, route) // 处理请求时可以根据path一次找到对应的route

    //  路由添加前置中间件
    const middlewares: any[] = []
    middlewares.push(route.path)
    if (route.middlewares) Array.prototype.push.apply(middlewares, route.middlewares) // 业务中间件

    //  注册路由
    try {
      switch (route.method) {
        case 'GET':
          router.get(route.path, route.middlewares)
          break
        case 'POST':
          router.post(route.path, route.middlewares)
          break
        case 'PUT':
          router.put(route.path, route.middlewares)
          break
        case 'DELETE':
          router.delete(route.path, route.middlewares)
          break
        default:
          throw new Error('不合法的http请求方法' + route.path)
      }
    } catch (error) {
      console.log(route, error)
    }
  }
}

export { initRouter, registerRoutes }
