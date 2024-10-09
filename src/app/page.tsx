"use client"

import React, { useState } from 'react'
import { useRecoilState } from 'recoil'
import { v4 as uuidv4 } from 'uuid'
import 'tailwindcss/tailwind.css'
import Button from '../components/ui/Button'
import taskListState from '../recoil/atoms/taskListState'

type Task = {
  id: string
  title: string
  content: string
  completed: boolean
}

const Home = () => {
  const [taskList, setTaskList] = useRecoilState(taskListState)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  const addTask = (e: React.FormEvent) => {
    e.preventDefault()
    if (title.trim() === '' || content.trim() === '') return
    const newTask: Task = {
      id: uuidv4(),
      title,
      content,
      completed: false,
    }
    setTaskList(prevTaskList => [...prevTaskList, newTask])
    setTitle('')
    setContent('')
  }

  const toggleTaskStatus = (id: string) => {
    setTaskList(prevTaskList =>
      prevTaskList.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    )
  }

  const deleteTask = (id: string) => {
    setTaskList(prevTaskList => prevTaskList.filter(task => task.id !== id))
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-100">
      <div className="w-full max-w-lg bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">ToDoアプリケーション</h1>
        <form onSubmit={addTask} className="mb-4">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={e => setTitle(e.target.value)}
            className="w-full p-2 border rounded mb-2"
          />
          <textarea
            placeholder="Content"
            value={content}
            onChange={e => setContent(e.target.value)}
            className="w-full p-2 border rounded mb-2"
          />
          <Button type="submit" className="w-full p-2 rounded" variant="primary">
            追加
          </Button>
        </form>
        <ul>
          {taskList.map(task => (
            <TaskItem
              key={task.id}
              task={task}
              onToggleStatus={() => toggleTaskStatus(task.id)}
              onDelete={() => deleteTask(task.id)}
            />
          ))}
        </ul>
      </div>
    </div>
  )
}

type TaskItemProps = {
  task: Task
  onToggleStatus: () => void
  onDelete: () => void
}

//Buttonコンポーネントの汎用性をデモするため、あえてトグル等を使用していません
const TaskItem: React.FC<TaskItemProps> = ({ task, onToggleStatus, onDelete }) => {
  return (
    <li className="flex items-center justify-between p-3 border-b border-gray-200">
      <div>
        <h3 className={`font-bold ${task.completed ? 'line-through text-gray-500' : ''}`}>{task.title}</h3>
        <p className={`${task.completed ? 'line-through text-gray-500' : ''}`}>{task.content}</p>
      </div>
      <div className="flex items-center">
        <Button onClick={onToggleStatus} className="px-3 py-1 rounded mr-2" variant={task.completed ? 'primary' : 'secondary'}>
          {task.completed ? '完了' : '未完了'}
        </Button>
        <Button onClick={onDelete} className="px-3 py-1 rounded" variant="danger">
          削除
        </Button>
      </div>
    </li>
  )
}

export default Home