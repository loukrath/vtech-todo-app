'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import { FaRegFolderClosed } from "react-icons/fa6";

import { getAllTodos, updateTask } from '@/utils/api'
import AddTaskBtn from '@/app/components/bases/AddTaskBtn'
import TodoList from '@/app/components/TodoList'
import SearchTask from '@/app/components/SearchTask'
import { ITask } from '@/types/tasks'
import Conditional from "@/app/components/bases/Conditional";
import THeadTodoList from "@/app/components/THeadTodoList";

export default function Home() {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  
  const getTasks = useCallback(async () => {
    setIsLoading(true)

    const rawTasks = await getAllTodos();
    
    setTasks(rawTasks)
    
    setIsLoading(false)
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
        

        <Conditional showWhen={isLoading}>
          <div className="bg-white mt-5 rounded-lg">
            <div className="overflow-x-auto">
              <table className="table text-black">
                <THeadTodoList />

                <tbody>
                  <tr className='border-b-0'>
                    <td colSpan={3} className='text-center py-5'>
                      <div className="flex justify-center items-center">
                        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </Conditional>

        <Conditional showWhen={!isLoading && tasks.length === 0}>
          <div className="bg-white mt-5 rounded-lg">
            <div className="overflow-x-auto">
              <table className="table text-black">
                <THeadTodoList />

                <tbody>
                  <tr className='border-b-0'>
                    <td colSpan={3} className='text-center py-5'>
                      <div className="flex flex-col justify-center items-center">
                        <FaRegFolderClosed className='text-5xl text-gray-400 mb-3' />
                        <p className='text-gray-400'>No data</p>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </Conditional>

        <Conditional showWhen={!isLoading && tasks.length > 0}>
          <TodoList
            tasks={tasks}
            onDeletedTask={onDeletedTask}
            onUpdateStatus={onUpdateStatus}
          />
        </Conditional>
      </div>
    </main>
  ),[
    tasks,
    isLoading,
    addNewTasks,
    onDeletedTask,
    onUpdateStatus,
    searchTask
  ]);
}
