import { useState } from 'react'
import Image from 'next/image'

import { getAllTodos } from '@/utils/api'
import AddTaskBtn from '@/app/components/bases/AddTaskBtn'
import TodoList from '@/app/components/TodoList'
import SearchTask from '@/app/components/SearchTask'

export default async function Home() {
  const tasks = await getAllTodos();

  return (
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
          <AddTaskBtn />
        </div>
        
        <TodoList tasks={tasks} />
      </div>
    </main>
  )
}
