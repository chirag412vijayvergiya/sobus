import { cloneElement, createContext, useContext, useState } from 'react';
import { createPortal } from 'react-dom';
import { HiXMark } from 'react-icons/hi2';
import { useOutsideClick } from '../hooks/useOutsideClick';

const ModalContext = createContext();

function Modal({ children }) {
  const [openName, setOpenName] = useState('');

  const close = () => setOpenName('');
  const open = (id) => setOpenName(id);
  return (
    <ModalContext.Provider value={{ close, open, openName }}>
      {children}
    </ModalContext.Provider>
  );
}

function Open({ children, opens: opensWindowName }) {
  const { open } = useContext(ModalContext);

  return cloneElement(children, { onClick: () => open(opensWindowName) });
}

function Window({ children, name }) {
  const { openName, close } = useContext(ModalContext);
  const ref = useOutsideClick(close);
  // console.log(openName);
  if (name !== openName) return null;

  return createPortal(
    <div className="duration-50 fixed inset-0 z-[10000] bg-gray-100/50 backdrop-blur transition-all dark:bg-slate-800/50">
      <div
        className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform rounded-lg bg-gray-100 p-6 shadow-lg transition-all duration-500 dark:bg-slate-800 md:p-8"
        ref={ref}
      >
        <button
          className="absolute right-9 top-1 translate-x-8 transform rounded-sm border-none bg-transparent p-1 transition-all duration-200 hover:bg-gray-200 dark:hover:bg-slate-900 md:right-9 md:p-2"
          onClick={close}
        >
          <HiXMark className="stroke-2 text-grey-900 dark:text-grey-100" />
        </button>
        <div>{cloneElement(children, { onCloseModal: close })}</div>
      </div>
    </div>,
    document.body,
  );
}

Modal.Open = Open;
Modal.Window = Window;

export default Modal;
