function CreateTaskForm() {
  return (
    <form
      className="relative flex w-[310px] flex-col overflow-hidden rounded-lg border-[1px] border-solid border-grey-100 bg-green-100 p-[1rem_2rem] text-xl dark:border-slate-800 dark:bg-slate-900 md:w-full md:p-[2.4rem_3rem]"
      //   onSubmit={handleSubmit(onSubmit)}
    >
      <h5 className="mx-1 items-center text-base font-semibold tracking-wider text-grey-800 dark:text-grey-100 md:mx-auto md:mb-3 md:text-xl">
        Assign Task
      </h5>
    </form>
  );
}

export default CreateTaskForm;
