function FormRow({ label, error, children, icon }) {
  return (
    <div className="flex-col border-b px-4 py-3 dark:border-slate-600 md:px-0">
      <div className="items-center gap-[3.5rem] md:grid md:grid-cols-[10rem_1fr]">
        {label && (
          <div className="flex items-center">
            {icon && icon}
            <label
              htmlFor={children.props.id}
              className="font-sans text-sm font-semibold tracking-widest text-stone-900 dark:text-grey-100 md:text-base"
            >
              {label}
            </label>
          </div>
        )}

        <div className="md:ml-auto">{children}</div>
      </div>
      {error && (
        <span className="text-sm tracking-wider text-red-700">💥 {error}</span>
      )}
    </div>
  );
}

export default FormRow;
