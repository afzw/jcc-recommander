import mongoose, { ObjectId, Types } from 'mongoose'
const { Schema, model } = mongoose

type HeroLevel = 1 | 2 | 3 | 4

type Lineup = {
  title: string
  description: string
  heroList: {
    heroId: ObjectId
    level: HeroLevel
    isC: boolean
  }
}

const LineupSchema = new Schema<Lineup>(
  {
    title: {
      type: String,
      required: true,
    },
    description: String,
    heroList: [
      {
        heroId: {
          type: Types.ObjectId,
          ref: 'hero',
          required: true,
        },
        level: {
          type: Number,
          required: true,
          default: 1,
        },
        isC: {
          type: Boolean,
          required: true,
          default: false,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
)

const LineupModel = model('lineup', LineupSchema)

export { Lineup, HeroLevel, LineupModel }
