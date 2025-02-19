import { Hero } from '@/types/app'
import requester from '@/utils/axios'

export const scrapeHeroes = async () => {
  return requester.post(`/heroes/scrape`)
}

export const getHeroes = async () => {
  return requester.get<Hero[]>(`/heroes`)
}
