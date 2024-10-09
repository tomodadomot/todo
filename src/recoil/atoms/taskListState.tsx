import { atom } from 'recoil'

type Task = {
  id: string
  title: string
  content: string
  completed: boolean
}

const taskListState = atom<Task[]>({
  key: 'taskListState',
  default: [],
})

export default taskListState