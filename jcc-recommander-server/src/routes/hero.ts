import { getHeroes, scrape } from '@/handlers/hero'
import { Route } from './app'

const HeroRoutes: Route[] = [
  {
    path: '/heroes/scrape',
    method: 'POST',
    middlewares: [scrape],
  },
  {
    path: '/heroes',
    method: 'GET',
    middlewares: [getHeroes],
  },
]

export default HeroRoutes
