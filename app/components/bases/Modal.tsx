import React from 'react'

interface ModalProps {
  isShowModal: boolean,
  setModalOpen: (open: boolean) => boolean | void,
  children: React.ReactNode
}

const Modal: React.FC<ModalProps> = ({ isShowModal, setModalOpen, children }) => {
  return (
    <dialog className={`modal ${isShowModal ? 'modal-open' : ''}`}>
      <div className="modal-box bg-white">
        <form method="dialog">
          <button
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            onClick={() => setModalOpen(false)}
          >✕</button>
        </form>
        
        {children}
      </div>
    </dialog>
  )
}

export default Modal
