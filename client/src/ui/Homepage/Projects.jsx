function Projects() {
  return (
    <div id="projects-section">
      <div className="min-w-screen relative flex min-h-[calc(100vh-90px)] overflow-hidden bg-green-100 bg-cover dark:bg-gray-900">
        <div className="rotate-150 bg-blue-00 absolute -bottom-5 -left-11 hidden h-80 w-80 rounded-full bg-blue-300 opacity-40 blur-[120px] dark:bg-blue-800 dark:opacity-30 md:block"></div>
        <div className="absolute -top-2 right-0 hidden h-80 w-80 rounded-full bg-green-200 opacity-40 blur-[120px] dark:bg-green-600 dark:opacity-20 md:block"></div>
        <div className="mx-auto mt-9 w-full text-center">
          <h1
            className="font-mono text-2xl font-semibold tracking-wider text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 hover:dark:text-indigo-300"
            style={{ textUnderlineOffset: '4px' }}
          >
            PROJECTS
          </h1>
        </div>
      </div>
    </div>
  );
}

export default Projects;
