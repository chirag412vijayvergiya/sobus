import { useState } from 'react';
import { useGetMyTask } from '../components/activities/useGetMyTask';
import { FaExpandAlt, FaCompressAlt } from 'react-icons/fa'; // Install react-icons if not already installed

function Mytasks() {
  const { MyTasks, isLoading, isError } = useGetMyTask();
  const [expandedTask, setExpandedTask] = useState(null);
  const [expandedDescriptions, setExpandedDescriptions] = useState({});

  const toggleDescription = (taskId) => {
    setExpandedDescriptions((prev) => ({
      ...prev,
      [taskId]: !prev[taskId],
    }));
  };

  const DESCRIPTION_LIMIT = 100;

  if (isLoading) {
    return (
      <div className="mt-10 flex flex-col items-center">
        <h2 className="text-xl font-semibold text-gray-700">
          Loading Your Tasks
        </h2>
        <p className="text-sm text-gray-500">
          Please wait while we fetch your tasks...
        </p>
        <div className="mt-5 h-10 w-10 animate-spin rounded-full border-4 border-green-500 border-t-transparent"></div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="mt-10 text-center">
        <h2 className="text-xl font-semibold text-red-600">
          Error Loading Tasks
        </h2>
        <p className="text-sm text-gray-500">
          Something went wrong. Please try again later.
        </p>
      </div>
    );
  }

  const toggleExpand = (taskId) => {
    setExpandedTask((prev) => (prev === taskId ? null : taskId));
  };

  return (
    <div className="relative min-h-screen w-full flex-1 bg-green-100 p-[8rem_1rem] font-sans tracking-wide dark:bg-slate-900 md:p-[8rem_6rem]">
      <div className="container mx-auto">
        <div className="text-center">
          <h1
            className="font-mono text-2xl font-semibold tracking-wider text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 hover:dark:text-indigo-300"
            style={{ textUnderlineOffset: '4px' }}
          >
            MY TASKS
          </h1>
          <p className="mt-2 font-mono text-indigo-700 dark:text-indigo-300">
            Manage your tasks efficiently. Click on a task to view more details.
          </p>
        </div>

        <div
          className="mt-8 grid grid-cols-1 gap-6 p-2 font-mono sm:grid-cols-2 lg:grid-cols-3"
          style={{ gridAutoRows: 'min-content' }}
        >
          {MyTasks?.tasks?.map((task) => (
            <div
              key={task._id}
              className="rounded-lg border bg-white p-4 shadow-md transition-all"
              style={{ alignSelf: 'start' }} // Prevents items from stretching
            >
              <div className="flex items-center justify-between">
                <h2 className="text-md font-semibold text-gray-800">
                  {task.task.length > 33 ? (
                    <>
                      {expandedTask === task._id
                        ? task.task
                        : `${task.task.slice(0, 33)}...`}
                      <button
                        onClick={() =>
                          toggleExpand(
                            expandedTask === task._id ? null : task._id,
                          )
                        }
                        className="ml-2 text-blue-500 hover:text-blue-700"
                      >
                        {expandedTask === task._id ? 'View Less' : 'View More'}
                      </button>
                    </>
                  ) : (
                    task.task
                  )}
                </h2>
                <button
                  className="text-gray-500 transition-transform hover:text-green-500"
                  onClick={() => toggleExpand(task._id)}
                >
                  {expandedTask === task._id ? (
                    <FaCompressAlt size={18} />
                  ) : (
                    <FaExpandAlt size={18} />
                  )}
                </button>
              </div>

              {/* Task Details */}
              <p className="mt-1 text-sm text-gray-500">
                Status:{' '}
                <span
                  className={`font-medium ${
                    task.status === 'completed'
                      ? 'text-green-500'
                      : 'text-yellow-500'
                  }`}
                >
                  {task.status}
                </span>
              </p>
              <p className="mt-1 text-sm text-gray-500">
                Activity:{' '}
                <span className="font-medium text-gray-700">
                  {task.activity.activityName}
                </span>
              </p>
              <p className="mt-1 text-sm text-gray-500">
                End Date:{' '}
                <span className="font-medium">
                  {new Date(task.taskEndDate).toLocaleDateString()}
                </span>
              </p>

              {/* Expandable Section */}
              <div
                className={`overflow-hidden transition-[max-height] duration-500 ease-in-out ${
                  expandedTask === task._id ? 'max-h-96' : 'max-h-0'
                }`}
              >
                <div className="mt-4">
                  <p className="text-sm text-gray-600">
                    <strong>Description:</strong>{' '}
                    {task.activity.activityDescription ||
                      'No description available.'}
                  </p>
                  <div className="mt-4">
                    <button className="mr-3 rounded bg-blue-500 px-4 py-2 text-white shadow hover:bg-blue-600">
                      Submit
                    </button>
                    <button
                      className="rounded border border-gray-300 bg-white px-4 py-2 text-gray-700 shadow hover:border-gray-500 hover:bg-gray-100"
                      onClick={() => toggleExpand(null)}
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Mytasks;
