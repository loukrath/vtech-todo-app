"use client"

import { useState } from "react"
import { FiEdit, FiTrash2 } from "react-icons/fi";

import { ITask } from "@/types/tasks";
import { updateTask } from '@/utils/api'
import Conditional from "@/app/components/bases/Conditional";

interface TaskProps {
  task: ITask,
  setModalEditOpen: (open: boolean, id: string) => boolean | void,
  setModalDeleteOpen: (open: boolean, id: string) => boolean | void,
  sumittedStatus: (task: ITask) => void
}

const Task: React.FC<TaskProps> = ({ task, setModalEditOpen, setModalDeleteOpen, sumittedStatus }) => {
  // Booleans
  const [isLoadingUpdate, setIsLoadingUpdate] = useState<boolean>(false)

  /**
   * Functions
   */
  const handleUpdateTaskStatus = async () => {
    try {
      setIsLoadingUpdate(true)
      const newTask = {
        id: task.id,
        todo: task.todo,
        isCompleted: !task.isCompleted,
        updateStatus: true
      }
  
      await updateTask(newTask)
      sumittedStatus(newTask)
    } catch (error) {
      console.log('error', error)
    } finally {
      setIsLoadingUpdate(false)
    }
  }

  return (
    <>
      <tr key={task.id} className="border-b-gray-200 group">
        <td>{task.todo}</td>
        <td className="text-center">
          <Conditional showWhen={task.isCompleted}>
            <button
              onClick={handleUpdateTaskStatus}
              className="btn btn-sm btn-outline btn-success btn-wide text-xs"
            >
              { isLoadingUpdate && <span className="loading loading-sm"></span> }
              Mark as Incomplete
            </button>
          </Conditional>

          <Conditional showWhen={!task.isCompleted}>
            <button
                onClick={handleUpdateTaskStatus}
                className="btn btn-sm btn-outline btn-wide text-xs"
              >
                { isLoadingUpdate && <span className="loading loading-sm"></span> }
                Mark as Complete
              </button>
          </Conditional>
        </td>
        <td className="flex opacity-0 space-x-2 group-hover:opacity-100">
          <FiEdit
            onClick={() => setModalEditOpen(true, task.id)}
            cursor="pointer"
            className="text-blue-500" size={25}
          />

          <FiTrash2
            onClick={() => setModalDeleteOpen(true, task.id)}
            cursor="pointer"
            className="text-red-500"
            size={25}
          />
        </td>
      </tr>
    </>
  )
}

export default Task
