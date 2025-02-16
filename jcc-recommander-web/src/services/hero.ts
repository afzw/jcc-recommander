import { Hero } from '@/types/app'
import requester from '@/utils/axios'
import { apiBaseUrl } from './common'

export const scrapeHeroes = async () => {
  return requester.post(`${apiBaseUrl}/heroes/scrape`)
}

export const getHeroes = async () => {
  return requester.get<Hero[]>(`${apiBaseUrl}/heroes`)
}
