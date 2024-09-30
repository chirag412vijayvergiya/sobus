import Menus from './../../ui/Menus';
import TableHeader from './TableHeader';
import TaskRow from './TaskRow';
import TaskTableFooter from './TaskTableFooter';
import { useGetTaskActivity } from './useGetTaskActivity';

function TaskTable() {
  const { tasks, isLoading } = useGetTaskActivity();

  if (isLoading) {
    return (
      <div className="mt-2 flex h-10 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-t-2 border-green-500"></div>
      </div>
    );
  }

  const headerContent = [
    'No.',
    'Name',
    'Email Id',
    'Task',
    'Status',
    'Deadline',
  ];

  const currentPage = 1;
  const count = tasks.length;
  return (
    <Menus>
      <div className="mt-6 flex flex-col font-mono">
        <div className="overflow-x-auto rounded-lg shadow-md">
          <table className="min-w-full border-collapse rounded-lg bg-white dark:border-slate-900 dark:bg-slate-800">
            <thead className="bg-green-500">
              <tr>
                {headerContent.map((content) => (
                  <TableHeader key={content} heading={content} />
                ))}
                <th scope="col" className="relative px-6 py-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-400 bg-grey-0 text-slate-600 dark:bg-slate-800 dark:text-grey-100">
              {tasks.map((task, index) => (
                <TaskRow
                  key={task._id}
                  index={index + (currentPage - 1) * 5 + 1}
                  elements={task}
                />
              ))}
            </tbody>
          </table>
          {/* <TaskTableFooter count={count} /> */}
        </div>
      </div>
    </Menus>
  );
}

export default TaskTable;
