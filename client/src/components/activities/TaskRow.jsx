import { HiEye } from 'react-icons/hi2';
import Menus from '../../ui/Menus';
import Modal from '../../ui/Modal';
import { formatDate } from '../../utils/helpers';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { IoInformationCircleOutline, IoTrashOutline } from 'react-icons/io5';
import { CiEdit } from 'react-icons/ci';
import CreateTaskForm from './CreateTaskForm';
import ConfirmDelete from '../../ui/ConfirmDelete';
import { useDeleteTask } from './useDeleteTask';
import GetFullDetailTask from './GetFullDetailTask';

function TaskRow({ index, elements }) {
  const { isDeleting, deleteTask } = useDeleteTask();
  const getStatusClass = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-600 border-green-300';
      case 'pending':
        return 'bg-red-100 text-red-600 border-red-300';
      default:
        return '';
    }
  };

  const defaultTaskValues = {
    task: elements.task,
    email: elements.assignee.email,
    deadline: new Date(elements.taskEndDate).toISOString().split('T')[0],
    status: elements.status,
  };

  return (
    <tr className="tracking-medium items-center text-sm odd:bg-gray-100 even:bg-gray-200 dark:odd:bg-slate-800 dark:even:bg-slate-900">
      <td className="whitespace-nowrap px-5 py-4">{index}</td>
      {/* <td className="relative whitespace-nowrap px-5 py-4">
        <span className="absolute right-[60px] top-[20px] h-3 w-3 animate-ping rounded-full bg-red-500 duration-300"></span>
        {index}
      </td> */}

      <td className="whitespace-nowrap px-5 py-4">{elements.assignee.name}</td>
      <td className="whitespace-nowrap px-5 py-4">{elements.assignee.email}</td>
      <td className="whitespace-nowrap px-5 pb-0.5 pt-2">
        <textarea
          className="w-full min-w-[200px] resize-none rounded-md border border-gray-300 p-2 text-sm text-slate-600 focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500 dark:border-slate-600 dark:bg-slate-800 dark:text-gray-200 sm:min-w-[200px]"
          value={elements.task}
          disabled
          rows={2} // Adjust the number of visible rows as needed
        />
      </td>

      <td className="whitespace-nowrap py-4 pr-5">
        <span
          className={`inline-block w-full max-w-xs border px-0.5 py-0.5 text-center font-medium ${getStatusClass(
            elements.status,
          )}`}
          style={{ borderRadius: '6px', minWidth: '90px' }}
        >
          {elements.status}
        </span>
      </td>
      <td className="whitespace-nowrap px-5 py-4">
        {formatDate(elements.taskEndDate)}
      </td>
      <td className="whitespace-nowrap px-6 py-2">
        <Modal>
          <Modal.Open opens="editTask-form">
            <button className="outline-2px mr-2 h-9 w-9 cursor-pointer rounded border-none bg-green-400 p-2.5 transition duration-200 ease-in-out hover:bg-green-800">
              <CiEdit className="h-full w-full text-gray-700 hover:text-black dark:text-white dark:hover:text-green-400" />
            </button>
          </Modal.Open>
          <Modal.Window name="editTask-form">
            <CreateTaskForm
              TaskId={elements._id}
              defaultTaskValues={defaultTaskValues}
            />
          </Modal.Window>
        </Modal>
        <Modal>
          <Modal.Open opens="delete">
            <button className="outline-2px h-9 w-9 cursor-pointer rounded border-none bg-red-400 p-2.5 transition duration-200 ease-in-out hover:bg-red-800">
              <IoTrashOutline className="h-full w-full text-gray-700 hover:text-black dark:text-white dark:hover:text-green-400" />
            </button>
          </Modal.Open>
          <Modal.Window name="delete">
            {/* <ConfirmDelete
              TaskId={elements._id}
              defaultTaskValues={defaultTaskValues}
            /> */}
            <ConfirmDelete
              resourceName="Task"
              disabled={isDeleting}
              onConfirm={() => deleteTask(elements._id)}
            />
          </Modal.Window>
        </Modal>
        <Modal>
          <Modal.Open opens="getDetails">
            <button className="outline-2px ml-2 h-9 w-9 cursor-pointer rounded border-none bg-blue-400 p-2.5 transition duration-200 ease-in-out hover:bg-blue-800">
              <IoInformationCircleOutline className="h-full w-full text-gray-700 hover:text-black dark:text-white dark:hover:text-blue-400" />
            </button>
          </Modal.Open>
          <Modal.Window name="getDetails">
            <GetFullDetailTask />
          </Modal.Window>
        </Modal>
      </td>
    </tr>
  );
}

export default TaskRow;
