import heroDao from '@/dao/hero'
import lineupDao from '@/dao/lineup'
import { Request, Response } from 'express'

interface GetLineupsResult {
  _id: string
  title: string
  description: string
  heroList: {
    _id: string
    name: string
    avatar: string
    level: number
    isC: boolean
  }[]
}

export async function createLineup(req: Request, res: Response): Promise<void> {
  const { title, description } = req.body

  const result = await lineupDao.create({ title, description })

  res.send(result)
}

export async function getLineups(req: Request, res: Response): Promise<void> {
  const findOptions = { populate: 'heroList.heroId' }
  const lineups = await lineupDao.find({}, null, findOptions)
  const result: GetLineupsResult[] = []

  for (const lineup of lineups) {
    const newHeroList: GetLineupsResult['heroList'] = []

    for (const hero of Array.isArray(lineup.heroList) ? lineup.heroList : []) {
      const heroDetail = {
        _id: hero.heroId._id.toString(),
        name: hero.heroId.name,
        avatar: hero.heroId.avatar,
        bonds: hero.heroId.bonds,
        level: hero.level,
        isC: hero.isC,
      }

      newHeroList.push(heroDetail)
    }

    result.push({
      _id: lineup._id.toString(),
      title: lineup.title,
      description: lineup.description,
      heroList: newHeroList,
    })
  }

  res.send(result)
}

export async function updateLineup(req: Request, res: Response): Promise<void> {
  const lineupId = req.params.lineupId
  const { title, description, heroList } = req.body

  const lineup = await lineupDao.findOne({ _id: lineupId })
  if (!lineup) {
    res.status(404).send('Not Found')
    return
  }

  const newHeroList = []

  // 处理heroList
  for (const heroInfo of heroList) {
    const hero = await heroDao.findOne({ _id: heroInfo._id })
    if (!hero) {
      res.status(404).send('hero not found!')
      return
    }
    const newHeroInfo = {
      heroId: heroInfo._id,
      level: heroInfo.level,
      isC: heroInfo.isC,
    }

    newHeroList.push(newHeroInfo)
  }

  const updatedLineup = await lineupDao.findOneAndUpdate(
    { _id: lineup._id },
    { title, description, heroList: newHeroList },
    { new: true }
  )

  res.send(updatedLineup)
}

export async function deleteLineup(req: Request, res: Response): Promise<void> {
  const lineupId = req.params.lineupId

  const lineup = await lineupDao.findOne({ _id: lineupId })
  if (!lineup) {
    res.status(404).send('Not Found')
    return
  }

  const deletedLineup = await lineupDao.findOneAndDelete({ _id: lineupId })

  res.send(deletedLineup)
}
