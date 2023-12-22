'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import Image from 'next/image'

import { getAllTodos, updateTask } from '@/utils/api'
import AddTaskBtn from '@/app/components/bases/AddTaskBtn'
import TodoList from '@/app/components/TodoList'
import SearchTask from '@/app/components/SearchTask'
import { ITask } from '@/types/tasks'

export default function Home() {
  const [tasks, setTasks] = useState<ITask[]>([]);
  
  const getTasks = useCallback(async () => {
    const rawTasks = await getAllTodos();
    setTasks(rawTasks)
  },[])

  const addNewTasks = useCallback((item: ITask) => {
    setTasks((prev: ITask[]) => [...prev, item]);
  },[]);

  const onDeletedTask = useCallback(async(id: string) => {
    // Remove task from state by id
    const newTasks = tasks.filter(task => task.id !== id)
    setTasks(newTasks)
  },[tasks]);

  const onUpdateStatus = useCallback(async (task: ITask) => {
    const newTasks = tasks.map((item: ITask) => {
      if (item.id === task.id) {
        item.isCompleted = task.isCompleted
      }

      return item
    })

    setTasks(newTasks)
  },[tasks]);

  const searchTask = useCallback(async (keyword: string) => {
    const rawTasks = await getAllTodos(keyword);

    setTasks(rawTasks)
  },[]);

  useEffect(() => {
    getTasks();
  },[getTasks]);

  return useMemo(() => (
    <main className='p-5'>
      <div className='container mx-auto'>
        <div className='mb-5'>
          <Image className='mx-auto' src="vtech-logo.svg" alt="me" width="128" height="128" />
        </div>

        <h1 className='text-center text-3xl uppercase text-primary mb-10'>
          Vtech Todo List
        </h1>

        <div className='flex space-x-5'>
          <SearchTask submitted={searchTask} />
          <AddTaskBtn submitted={addNewTasks} />
        </div>
        
        <TodoList
          tasks={tasks}
          onDeletedTask={onDeletedTask}
          onUpdateStatus={onUpdateStatus}
        />
      </div>
    </main>
  ),[
    tasks,
    addNewTasks,
    onDeletedTask,
    onUpdateStatus,
    searchTask
  ]);
}
