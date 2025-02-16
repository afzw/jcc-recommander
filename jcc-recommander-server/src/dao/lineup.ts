import { Lineup, LineupModel } from '@/models/lineup'
import MongooseDaoBase from './utils/base'

class LineupDao extends MongooseDaoBase<Lineup> {}

const lineupDao = new LineupDao(LineupModel)

export default lineupDao
