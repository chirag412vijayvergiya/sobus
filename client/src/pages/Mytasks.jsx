import { useState } from 'react';

function Mytasks() {
  // Fake data for tasks
  const [tasks] = useState([
    {
      _id: '66f64c147cae860fff259bf5',
      task: 'Complete documentation',
      status: 'pending',
      taskEndDate: '2024-11-03T00:00:00.000Z',
    },
    {
      _id: '66f64d5ae5d5906f94cb7167',
      task: 'Make Portfolio page flyer 2',
      status: 'completed',
      taskEndDate: '2024-11-01T10:30:00.000Z',
    },
    {
      _id: '66f64d6f8d7ffdb643c38026',
      task: 'Make Portfolio page flyer 2',
      status: 'pending',
      taskEndDate: '2024-11-01T10:30:00.000Z',
    },
    {
      _id: '66f81eb38d3508dd3083804c',
      task: 'Create Flyer',
      status: 'pending',
      taskEndDate: '2024-09-30T00:00:00.000Z',
    },
    {
      _id: '66faf95d8d810e8472717c23',
      task: 'Create a deep impact to make the event great',
      status: 'pending',
      taskEndDate: '2024-10-09T00:00:00.000Z',
    },
    {
      _id: '6716a11d0f2fafa3bb82c17d',
      task: 'Complete flyer with documentation',
      status: 'pending',
      taskEndDate: '2024-10-23T00:00:00.000Z',
    },
  ]);

  return (
    <div className="container mx-auto py-8">
      <h1 className="mb-6 text-3xl font-bold">My Assigned Tasks</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full rounded-lg border border-gray-200 bg-white">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2 text-left">Task</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Due Date</th>
            </tr>
          </thead>
          <tbody>
            {tasks.length === 0 ? (
              <tr>
                <td colSpan="3" className="py-4 text-center text-gray-500">
                  No tasks assigned.
                </td>
              </tr>
            ) : (
              tasks.map((task) => (
                <tr key={task._id} className="border-b border-gray-200">
                  <td className="px-4 py-3">{task.task}</td>
                  <td
                    className={`px-4 py-3 ${
                      task.status === 'completed'
                        ? 'text-green-500'
                        : 'text-orange-500'
                    }`}
                  >
                    {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
                  </td>
                  <td className="px-4 py-3">
                    {new Date(task.taskEndDate).toLocaleDateString()}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Mytasks;
