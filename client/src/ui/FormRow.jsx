function FormRow({ label, error, children }) {
  return (
    <div className="flex-col border-b px-4 py-3 dark:border-slate-600 md:px-0">
      <div className="items-center gap-[3.5rem] md:grid md:grid-cols-[10rem_1fr_1fr] ">
        {label && (
          <label
            htmlFor={children.props.id}
            className="font-sans text-sm font-medium tracking-widest text-stone-900 dark:text-grey-100 md:text-base"
          >
            {label}
          </label>
        )}
        {children}
      </div>
      {error && (
        <span className="text-sm tracking-wider text-red-700">💥 {error}</span>
      )}
    </div>
  );
}

export default FormRow;
