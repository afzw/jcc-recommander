import mongoose from 'mongoose'
const { Schema, model } = mongoose

type Hero = {
  name: string
  bonds: string
  avatar: string
}

const heroSchema = new Schema<Hero>(
  {
    name: {
      type: String,
      required: true,
    },
    bonds: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

const HeroModel = model('hero', heroSchema)

export { Hero, HeroModel }
