export interface Hero {
  _id: string
  name: string
  bonds: string
  avatar: string
}

export interface Lineup {
  _id: string
  title: string
  description: string
  heroList: ({ level: number; isC: boolean } & Hero)[]
}
