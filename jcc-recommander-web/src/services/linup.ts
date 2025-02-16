import { Lineup } from '@/types/app'
import { apiBaseUrl } from './common'
import requester from '@/utils/axios'

export const createLineup = async (data: Lineup) => {
  return requester.post(`${apiBaseUrl}/lineups`, data)
}

export const getLineups = async () => {
  return requester.get<Lineup[]>(`${apiBaseUrl}/lineups`)
}

export const updateLineup = async (id: string, data: Lineup) => {
  return requester.put(`${apiBaseUrl}/lineups/${id}`, data)
}

export const deleteLineup = async (id: string) => {
  return requester.delete(`${apiBaseUrl}/lineups/${id}`)
}
