import { Lineup } from '@/types/app'
import requester from '@/utils/axios'

export const createLineup = async (data: Lineup) => {
  return requester.post(`/lineups`, data)
}

export const getLineups = async () => {
  return requester.get<Lineup[]>(`/lineups`)
}

export const updateLineup = async (id: string, data: Lineup) => {
  return requester.put(`/lineups/${id}`, data)
}

export const deleteLineup = async (id: string) => {
  return requester.delete(`/lineups/${id}`)
}
