import React, { useRef, useState } from 'react'
import { Hero, Lineup } from '@/types/app'
import { CloseCircleFilled, EditOutlined, PlusOutlined } from '@ant-design/icons'
import { Avatar, Button, Form, Input, message, Modal } from 'antd'
import callAsync from '@/utils/callAsync'
import { createLineup, deleteLineup, updateLineup } from '@/services/linup'

interface LineupListProps {
  lineups: Lineup[]
  loadLineups: () => void
}

export default function LineupList({ lineups, loadLineups }: LineupListProps) {
  const [editingTitleIndex, setEditingTitleIndex] = useState<number | null>(null)
  const [currentTitle, setCurrentTitle] = useState('')
  const [editingDescriptionIndex, setEditingDescriptionIndex] = useState<number | null>(null)
  const [currentDescription, setCurrentDescription] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const [editingHeroListIndex, setEditingHeroListIndex] = useState<number | null>(null)
  const [currentHeroList, setCurrentHeroList] = useState<Hero[]>([])
  const [deleteLineupIndex, setDeleteLineupIndex] = useState<number | null>(null)
  const [isDeleteLinupModalOpen, setIsDeleteLinupModalOpen] = useState(false)
  const [isCreateLineupModalOpen, setIsCreateLineupModalOpen] = useState(false)
  const [createLineupForm] = Form.useForm()

  const handleEditTitleClick = (index: number | null, content: string) => {
    setEditingTitleIndex(index)
    setCurrentTitle(content)
    setTimeout(() => inputRef.current?.focus(), 0)
  }

  const handleTitleBlur = async (id: string) => {
    if (!currentTitle.trim()) {
      message.warning('内容不能为空')
      return setEditingTitleIndex(null)
    }

    const content = lineups.find((lineup) => lineup._id === id) as any
    content.title = currentTitle

    // 请求更新
    const [updateErr] = await callAsync(updateLineup(id, content))
    if (updateErr) {
      message.error('更新失败')
    } else {
      message.success('更新成功')
    }
    setEditingTitleIndex(null)
  }

  const handleEditDescriptionClick = (index: number | null, content: string) => {
    setEditingDescriptionIndex(index)
    setCurrentDescription(content)
    setTimeout(() => inputRef.current?.focus(), 0)
  }

  const handleDescriptionBlur = async (id: string) => {
    if (!currentDescription.trim()) {
      message.warning('内容不能为空')
      return setEditingDescriptionIndex(null)
    }

    const content = lineups.find((lineup) => lineup._id === id) as any
    content.description = currentDescription

    const [updateErr] = await callAsync(updateLineup(id, content))
    if (updateErr) {
      message.error('更新失败')
    } else {
      message.success('更新成功')
    }
    setEditingDescriptionIndex(null)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const hero = JSON.parse(e.dataTransfer.getData('application/json'))
    setCurrentHeroList([...currentHeroList, hero])
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
  }

  const handleClickHeroEdit = (index: number) => {
    setEditingHeroListIndex(editingHeroListIndex === null ? index : null)
    setCurrentHeroList(lineups[index].heroList)
  }

  const handleRemoveHero = (index: number) => {
    setCurrentHeroList(currentHeroList.filter((_, i) => i !== index))
  }

  const handleClickHeroSave = async (index: number) => {
    setEditingHeroListIndex(editingHeroListIndex === null ? index : null)
    const content = lineups.find((lineup) => lineup._id === lineups[index]._id) as any
    content.heroList = currentHeroList
    const [updateErr] = await callAsync(updateLineup(content._id, content))
    if (updateErr) {
      message.error('更新失败')
    } else {
      message.success('更新成功')
    }
    setEditingHeroListIndex(null)
    setCurrentHeroList([])
  }

  const handleOpenCreateLineupModal = () => {
    setIsCreateLineupModalOpen(true)
  }

  const handleCreateLineup = () => {
    createLineupForm.validateFields().then(async (values) => {
      const [createErr] = await callAsync(createLineup(values))
      if (createErr) {
        message.error('创建失败')
      }
      handleCloseCreateLineupModal()
      loadLineups()
    })
  }

  const handleCloseCreateLineupModal = () => {
    createLineupForm.resetFields()
    setIsCreateLineupModalOpen(false)
  }

  const handleOpenDeleteLineupModal = (index: number) => {
    setIsDeleteLinupModalOpen(true)
    setDeleteLineupIndex(index)
  }

  const handleDeleteLineup = async (index: number) => {
    const [deleteErr] = await callAsync(deleteLineup(lineups[index]._id))
    if (deleteErr) {
      message.error('删除失败')
    } else {
      message.success('删除成功')
    }
    handleCloseDeleteLineupModal()
    loadLineups()
  }

  const handleCloseDeleteLineupModal = () => {
    setIsDeleteLinupModalOpen(false)
  }

  return (
    <div style={{ height: 'calc(100vh - 120px)', overflowY: 'auto' }}>
      <div className="lineup-list">
        {lineups.map((lineup, index) => (
          <div key={lineup._id} className="item">
            {editingTitleIndex === index ? (
              <input
                ref={inputRef}
                value={currentTitle}
                onChange={(e) => setCurrentTitle(e.target.value)}
                onBlur={() => {
                  handleTitleBlur(lineup._id)
                }}
              />
            ) : (
              <div className="title-wrapper">
                <span className="title">{lineup.title}</span>
                <EditOutlined className="text-edit" onClick={() => handleEditTitleClick(index, lineup.title)} />
                <Button
                  type="primary"
                  size="small"
                  className="delete-lineup-btn"
                  danger
                  onClick={() => handleOpenDeleteLineupModal(index)}
                >
                  删除
                </Button>
              </div>
            )}
            {editingDescriptionIndex === index ? (
              <input
                ref={inputRef}
                value={currentDescription}
                onChange={(e) => setCurrentDescription(e.target.value)}
                onBlur={() => {
                  handleDescriptionBlur(lineup._id)
                }}
              />
            ) : (
              <div className="description-wrapper">
                <span className="description">{lineup.description}</span>
                <EditOutlined
                  className="text-edit"
                  onClick={() => handleEditDescriptionClick(index, lineup.description)}
                />
              </div>
            )}
            {/** 英雄列表 */}
            {editingHeroListIndex === index ? (
              <div className="hero-list-wrapper">
                <div className="editing-hero-list">
                  {currentHeroList.map((hero, index) => (
                    <div key={index} className="hero">
                      <div key={index} className="hero-wrapper" style={{ position: 'relative' }}>
                        <Avatar src={hero.avatar} size={40} />
                        <CloseCircleFilled className="remove-btn" onClick={() => handleRemoveHero(index)} />
                      </div>
                    </div>
                  ))}
                  {editingHeroListIndex === index && (
                    <div onDragOver={handleDragOver} onDrop={handleDrop} className="add-hero-btn">
                      <span style={{ fontSize: '24px', color: '#aaa' }}>+</span>
                    </div>
                  )}
                </div>
                <Button className="save-edit-btn" onClick={() => handleClickHeroSave(index)}>
                  保存英雄
                </Button>
              </div>
            ) : (
              <div className="hero-list-wrapper">
                {lineups[index].heroList.length === 0 && <div>暂无英雄</div>}
                <div className="hero-list">
                  {lineups[index].heroList.map((hero, index) => (
                    <div key={index} className="hero">
                      {hero && <Avatar src={hero.avatar} size={40} />}
                    </div>
                  ))}
                </div>
                <Button className="save-edit-btn" onClick={() => handleClickHeroEdit(index)}>
                  编辑英雄
                </Button>
              </div>
            )}
          </div>
        ))}
        <Button
          type="primary"
          className="add-lineup-btn"
          icon={<PlusOutlined />}
          size="large"
          onClick={handleOpenCreateLineupModal}
        ></Button>
        <Modal
          title="新建阵容"
          open={isCreateLineupModalOpen}
          onOk={handleCreateLineup}
          onCancel={handleCloseCreateLineupModal}
          okText="确定"
          cancelText="取消"
        >
          <Form form={createLineupForm} layout="vertical">
            <Form.Item label="标题" name="title" rules={[{ required: true, message: '请输入标题' }]}>
              <Input placeholder="请输入标题" />
            </Form.Item>
            <Form.Item label="描述" name="description" rules={[{ required: true, message: '请输入描述' }]}>
              <Input.TextArea placeholder="请输入描述" />
            </Form.Item>
          </Form>
        </Modal>
        <Modal
          title="删除阵容"
          open={isDeleteLinupModalOpen}
          onOk={() => deleteLineupIndex !== null && handleDeleteLineup(deleteLineupIndex)}
          onCancel={handleCloseDeleteLineupModal}
          okText="确定"
          okType="danger"
          cancelText="取消"
        >
          <p>确定要删除这个阵容吗？</p>
        </Modal>
      </div>
    </div>
  )
}
