import { Avatar, List } from 'antd'
import { Hero } from '../types/app'
import React, { useRef, useState } from 'react'

interface HeroListProps {
  heroes: Hero[]
}

export default function HeroList({ heroes }: HeroListProps) {
  const [dragingHero, setDragingHero] = useState<null | Hero>(null)
  const dragImageRef = useRef(null)

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, hero: Hero) => {
    setDragingHero(hero)
    e.dataTransfer.setData('application/json', JSON.stringify(hero))
    if (dragImageRef.current) {
      e.dataTransfer.setDragImage(dragImageRef.current, 20, 20)
    }
  }

  const handleDragEnd = () => {
    setDragingHero(null)
  }

  return (
    <div style={{ height: 'calc(100vh - 120px)', overflowY: 'auto' }}>
      <div ref={dragImageRef} style={{ position: 'absolute', top: -9999 }}>
        {dragingHero && <Avatar src={dragingHero.avatar} size={40} />}
      </div>

      <List
        dataSource={heroes}
        renderItem={(hero) => (
          <List.Item
            key={hero._id}
            style={{ cursor: 'grab' }}
            onClick={() => console.log('Selected hero:', hero)}
            draggable
            onDragStart={(e) => handleDragStart(e, hero)}
            onDragEnd={handleDragEnd}
          >
            <List.Item.Meta avatar={<Avatar src={hero.avatar} />} title={hero.name} description={hero.bonds} />
          </List.Item>
        )}
      />
    </div>
  )
}
