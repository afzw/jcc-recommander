import { createLineup, getLineups, updateLineup, deleteLineup } from '@/handlers/lineup'
import { Route } from './app'

const LineupRoutes: Route[] = [
  {
    path: '/lineups',
    method: 'POST',
    middlewares: [createLineup],
  },
  {
    path: '/lineups',
    method: 'GET',
    middlewares: [getLineups],
  },
  {
    path: '/lineups/:lineupId',
    method: 'PUT',
    middlewares: [updateLineup],
  },
  {
    path: '/lineups/:lineupId',
    method: 'DELETE',
    middlewares: [deleteLineup],
  },
]

export default LineupRoutes
