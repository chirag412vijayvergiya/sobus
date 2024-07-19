import { createContext, useContext, useEffect, useState } from 'react';
import { useOutsideClick } from '../hooks/useOutsideClick';
import { createPortal } from 'react-dom';

const MenusContext = createContext();

function Menus({ children }) {
  const [openId, setOpenId] = useState('');
  const [position, setPosition] = useState(null);

  const close = () => setOpenId('');
  const open = setOpenId;

  // useEffect(() => {
  //   console.log('openId changed:', openId);
  // }, [openId]);

  return (
    <MenusContext.Provider
      value={{ openId, close, open, position, setPosition }}
    >
      {children}
    </MenusContext.Provider>
  );
}

function Toggle({ id, icon: Icon, className, disabled, notificationCount }) {
  const { openId, close, open, setPosition } = useContext(MenusContext);
  // console.log('openId :- ', openId);
  function handleClick(e) {
    e.stopPropagation();
    const rect = e.target.closest('button').getBoundingClientRect();
    setPosition({
      x: window.innerWidth - rect.width - rect.x,
      y: rect.y + rect.height + 8,
    });
    // console.log('openId and id: -', openId, id);
    openId === '' || openId !== id ? open(id) : close();
    // if (openId === id) {
    //   close();
    // } else {
    //   open(id);
    // }
    // console.log(notificationCount);
  }
  return (
    <button onClick={handleClick} className={className} disabled={disabled}>
      <Icon className="h-[1.4rem] w-[1.4rem] disabled:cursor-not-allowed" />
      {notificationCount >= 0 && (
        <span className="absolute right-2 top-[0.6rem] flex h-4 w-4 -translate-y-1/2 translate-x-1/2 transform items-center justify-center rounded-full bg-red-500 text-xs text-white">
          {notificationCount}
        </span>
      )}
    </button>
  );
}

function List({ id, children, positionX, positionY }) {
  const { openId, position, close } = useContext(MenusContext);
  // console.log('close', close);
  const ref = useOutsideClick(close, false);
  // console.log(openId, id);
  if (openId !== id) return null;

  return createPortal(
    <ul
      style={{ right: position?.x - positionX, top: position?.y + positionY }}
      className="fixed z-[2000] rounded-sm bg-grey-200 text-grey-700 shadow-md dark:bg-slate-800 dark:text-grey-300"
      ref={ref}
    >
      {children}
    </ul>,
    document.body,
  );
}

function Button({ children, icon, onClick }) {
  const { close } = useContext(MenusContext);

  function handleClick() {
    onClick?.();
    close();
  }

  return (
    <li>
      <button
        onClick={handleClick}
        className="flex w-full items-center gap-[1rem] border-none bg-none p-[0.7rem_1.4rem] text-left text-sm tracking-widest transition-all hover:bg-grey-300 hover:text-indigo-600 dark:hover:bg-slate-900 dark:hover:text-indigo-100"
      >
        {icon}
        <span>{children}</span>
      </button>
    </li>
  );
}

function Input({ children, icon, type, accept, onChange, disabled }) {
  const { close } = useContext(MenusContext);

  function handleClick(event) {
    onChange?.(event);
    close();
  }

  return (
    <li>
      <div
        className="flex w-full items-center gap-[1rem] border-none bg-none p-[0.6rem_1.2rem] text-left text-sm tracking-widest transition-all hover:bg-grey-300 hover:text-indigo-600 dark:hover:bg-slate-900 dark:hover:text-indigo-100"
        style={{ position: 'relative', cursor: 'pointer' }}
      >
        <input
          type={type}
          accept={accept}
          onChange={handleClick}
          disabled={disabled}
          style={{
            position: 'absolute',
            opacity: 0,
            width: '100%',
            height: '100%',
            top: 0,
            left: 0,
            cursor: 'pointer',
          }}
        />
        {icon && <span>{icon}</span>}
        <span>{children}</span>
      </div>
    </li>
  );
}

Menus.Toggle = Toggle;
Menus.List = List;
Menus.Button = Button;
Menus.Input = Input;

export default Menus;
