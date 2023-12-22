'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import Image from 'next/image'

import { getAllTodos } from '@/utils/api'
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
          <SearchTask />
          <AddTaskBtn submitted={addNewTasks} />
        </div>
        
        <TodoList tasks={tasks} />
      </div>
    </main>
  ),[tasks, addNewTasks]);
}
