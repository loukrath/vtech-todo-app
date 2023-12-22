"use client"

import React, { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { PiWarningLight } from "react-icons/pi";
import { IoMdCloseCircle } from "react-icons/io";
import { SubmitHandler, useForm } from "react-hook-form";

import { ITask } from "@/types/tasks"
import Task from "@/app/components/Task"
import Modal from "@/app/components/bases/Modal"
import { updateTask, deleteTask } from "@/utils/api"
import Conditional from "@/app/components/bases/Conditional";


interface TodoListProps {
  tasks: ITask[],
  onDeletedTask: (id: string) => void,
  onUpdateStatus: (task: ITask) => void
}

type Inputs = {
  todo: string
}

const TodoListTable: React.FC<TodoListProps> = ({ tasks, onDeletedTask, onUpdateStatus }) => {
  const [isLoadingUpdate, setIsLoadingUpdate] = useState<boolean>(false)
  const [isShowEditModal, setIsShowEditModal] = useState<boolean>(false)
  const [isShowDeleteModal, setIsShowDeleteModal] = useState<boolean>(false)
  const [isLoadingDelete, setIsLoadingDelete] = useState<boolean>(false)
  const [taskToEdit, setTaskToEdit] = useState<ITask>({id: '', todo: '', isCompleted: false})
  const [idTaskToDelete, setIdTaskToDelete] = useState<string>('')
  const [alertError, setAlertError] = useState<string>('')

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue
  } = useForm<ITask>({
    defaultValues: {
      todo: '',
    }
  })

  /**
   * Functions
   */
  const handleOpenEditModal = (isOpen: boolean, id: string) => {
    // Find task by id
    const task = tasks.find(task => task.id === id) as ITask

    setValue('todo', task.todo);
    setTaskToEdit(task)
    setIsShowEditModal(isOpen)
  }

  const onSubmit: SubmitHandler<Inputs> = async (data: Inputs) => {
    try {
      setIsLoadingUpdate(true)
      taskToEdit.todo = data.todo
      
      const resp = await updateTask(taskToEdit)

      if (resp.status === 200) {
        setIsShowEditModal(false)
        reset();
        setAlertError('')
      }
    } catch (error) {
      const { response } = error as any;

      setAlertError(response.data.message || 'Something went wrong')
    } finally {
      setIsLoadingUpdate(false)
    }
  }

  const handleOpenDeleteModal = (isOpen: boolean, id: string) => {
    setIdTaskToDelete(id)
    setIsShowDeleteModal(isOpen)
  }

  const handleDeleteTask = async () => {
    try {
      setIsLoadingDelete(true)

      await deleteTask(idTaskToDelete)

      onDeletedTask(idTaskToDelete)
      setIsShowDeleteModal(false)
    } catch (error) {
      console.log('error', error)
    } finally {
      setIsLoadingDelete(false)
    }
  }

  const sumittedStatus = (task: ITask) => {
    // const newTasks = tasks.map(item => {
    //   if (item.id === task.id) {
    //     item = task
    //   }
    //   return item
    // })

    // setTasks(newTasks)

    console.log('task', task)
  }

  return (
    <>
      <div className="bg-white mt-5 rounded-lg">
        <div className="overflow-x-auto">
          <table className="table text-black">
            <thead>
              <tr className="border-b-0 bg-gray-200 text-black">
                <th>TODO</th>
                <th className="text-center">Status</th>
                <th>ACTION</th>
              </tr>
            </thead>
            <tbody>
              { 
                tasks.map((task) => 
                  <Task
                    key={task.id}
                    task={task}
                    setModalEditOpen={(isOpen, id) => handleOpenEditModal(isOpen, id)}
                    setModalDeleteOpen={(isOpen, id) => handleOpenDeleteModal(isOpen, id)}
                    sumittedStatus={onUpdateStatus}
                  />)
              }
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit modal */}
      <Modal
        isShowModal={isShowEditModal}
        setModalOpen={setIsShowEditModal}
        >
        <form  onSubmit={handleSubmit(onSubmit)}>
          <h3 className='font-bold text-lg text-center text-primary'>
            Edit task
          </h3>

          <div className='modal-action'>
            <div className='flex flex-col w-full space-y-2'>
              <input
                className="input input-bordered w-full max-w-full text-black bg-white"
                { ...register("todo", { required: true }) }
              />
              <Conditional showWhen={!!errors.todo}>
                <span className='text-xs text-red-500'>This field is required</span>
              </Conditional>
            </div>

            <button type='submit' className='btn btn-primary text-white'>
              { isLoadingUpdate && <span className="loading loading-sm"></span> }
              Update
            </button>
          </div>
        </form>
        <Conditional showWhen={!!alertError}>
          <div role="alert" className="alert alert-error mt-5">
            <PiWarningLight className="text-white" size={25} />
            <span className='text-white'>{ alertError }</span>

            <IoMdCloseCircle
              className="text-white" size={25}
              cursor="pointer"
              onClick={() => setAlertError('')}
            />
          </div>
        </Conditional>
      </Modal>

      {/* Delete modal */}
      <Modal
        isShowModal={isShowDeleteModal}
        setModalOpen={setIsShowDeleteModal}
      >
        <h3 className='font-bold text-lg text-center text-primary'>
          Are you sure you want to delete this task?
        </h3>

        <div className="modal-action">
          <div className="space-x-2 w-full flex">
            <button
              onClick={() => setIsShowDeleteModal(false)}
              className="btn btn-ghost flex-1"
            >
              Cancel
            </button>

            <button
              onClick={handleDeleteTask}
              className="btn btn-error flex-1 text-white"
            >
              { isLoadingDelete && <span className="loading loading-sm"></span> }
              Confirm
            </button>
          </div>
        </div>
      </Modal>
    </>
  )
}

export default TodoListTable
