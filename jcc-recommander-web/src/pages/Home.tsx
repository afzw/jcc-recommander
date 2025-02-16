import { useEffect, useState } from 'react'
import HeroList from '../components/HeroList'
import Lineups from '@/components/LineupList'
import { Hero, Lineup } from '@/types/app'
import { Button, Layout, Spin } from 'antd'
import callAsync from '@/utils/callAsync'
import { getHeroes, scrapeHeroes } from '@/services/hero'
import { getLineups } from '@/services/linup'

const { Sider, Content } = Layout

export default function Home() {
  const [heroes, setHeroes] = useState<Hero[]>([])
  const [lineups, setLineups] = useState<Lineup[]>([])
  const [heroLoading, setHeroLoading] = useState(true)
  const [lineupLoading, setLineupLoading] = useState(true)

  const loadHeroes = async () => {
    const [getHeroErr, heroRes] = await callAsync(getHeroes())
    if (getHeroErr) {
      console.error('Failed to load heroes:', getHeroErr)
      return
    }
    if (heroRes) setHeroes(heroRes.data)
    setHeroLoading(false)
  }

  const loadLineups = async () => {
    const [getLineupErr, lineupRes] = await callAsync(getLineups())
    if (getLineupErr) {
      console.error('Failed to load lineups:', getLineupErr)
      return
    }
    if (lineupRes) setLineups(lineupRes.data)
    setLineupLoading(false)
  }

  const scrapeHero = async () => {
    setHeroLoading(true)
    const [scrapeErr] = await callAsync(scrapeHeroes())
    if (scrapeErr) {
      console.error('Failed to scrape heroes:', scrapeErr)
      return
    }
    console.log('1111')
    loadHeroes()
    setHeroLoading(false)
  }

  useEffect(() => {
    loadHeroes()
    loadLineups()
  }, [])

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        width="25%"
        style={{
          background: '#fff',
          padding: '16px',
          borderRight: '1px solid #f0f0f0',
        }}
      >
        <h2 style={{ textAlign: 'center' }}>英雄列表</h2>
        <Button type="primary" block className="scrape-heroes" style={{ margin: '1em 0' }} onClick={() => scrapeHero()}>
          爬取英雄数据
        </Button>
        {heroLoading ? <Spin size="large" /> : <HeroList heroes={heroes} />}
      </Sider>
      <Content style={{ padding: '16px' }}>
        <h2 style={{ textAlign: 'center' }}>阵容</h2>
        {lineupLoading ? <Spin size="large" /> : <Lineups lineups={lineups} loadLineups={loadLineups} />}
      </Content>
    </Layout>
  )
}
