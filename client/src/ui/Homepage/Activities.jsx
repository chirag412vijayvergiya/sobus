function Activities() {
  const isPending = false;
  return (
    <div
      id="home"
      className="mt-[90px] min-h-[calc(100vh-90px)] bg-grey-50 dark:bg-slate-900 sm:mt-[4rem]"
    >
      <div className="min-w-screen relative flex w-full overflow-hidden md:min-h-[100vh]">
        <div className="rotate-150 absolute -left-11 top-0 z-[100] hidden h-80 w-80 rounded-full bg-blue-300 opacity-40 blur-[120px] dark:bg-blue-800 dark:opacity-30 md:block"></div>
        <div className="absolute bottom-0 right-0 z-[100] hidden h-80 w-80 rounded-full bg-green-200 opacity-40 blur-[120px] dark:bg-green-600 dark:opacity-20 md:block"></div>
        <div className="mx-auto w-full pt-8 text-center">
          <h1
            className="font-mono text-2xl font-semibold tracking-wider text-indigo-600 underline hover:text-indigo-500 dark:text-indigo-400 hover:dark:text-indigo-300"
            style={{ textUnderlineOffset: '4px' }}
          >
            COE ACTIVITES
          </h1>
        </div>
      </div>
    </div>
  );
}

export default Activities;
