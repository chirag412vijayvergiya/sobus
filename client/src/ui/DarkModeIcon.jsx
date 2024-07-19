function ButtonIcon({ children, onClick, disabled }) {
  return (
    <button
      className="outline-2px h-10 w-10 cursor-pointer rounded border-none bg-transparent p-2 transition duration-200 ease-in-out hover:bg-gray-200 dark:hover:bg-slate-800"
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export default ButtonIcon;
