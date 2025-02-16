import { HeroModel, Hero } from '@/models/hero'
import MongooseDaoBase from './utils/base'

class HeroDao extends MongooseDaoBase<Hero> {}

const heroDao = new HeroDao(HeroModel)

export default heroDao
