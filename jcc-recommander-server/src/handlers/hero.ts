import { Request, Response } from 'express'
import HeroDao from '@/dao/hero'
import { getHeroData } from '@/services/hero'

export async function scrape(req: Request, res: Response): Promise<void> {
  const heroData = await getHeroData()

  const asyncTasks = heroData.map(async (hero) => {
    const existedHero = await HeroDao.findOne({ name: hero.name })
    if (existedHero) {
      await HeroDao.findOneAndUpdate({ name: hero.name }, hero, { new: true })
    } else {
      await HeroDao.create(hero)
    }
  })

  await Promise.all(asyncTasks)

  const result = await HeroDao.find({})

  res.send(result)
}

export async function getHeroes(req: Request, res: Response): Promise<void> {
  const result = await HeroDao.find({}, null, { lean: true })

  res.send(result)
}
