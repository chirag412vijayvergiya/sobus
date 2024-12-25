import toast from 'react-hot-toast';
import Button from '../../ui/Button';
import { useReviewTask } from '../Task/useReviewTask';
import { AiOutlineFileText, AiOutlineLink } from 'react-icons/ai';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

function GetFullDetailTask({
  disabled,
  onCloseModal,
  defaultTaskValues,
  TaskId,
}) {
  const { reviewTask, isReviewing } = useReviewTask();

  const handleReview = (status) => {
    if (!defaultTaskValues || !TaskId) {
      toast.error('Task ID not available');
      return;
    }

    reviewTask(
      {
        taskId: TaskId,
        status,
      },
      {
        onSuccess: () => {
          onCloseModal?.();
        },
        onError: (err) => {
          console.error('Error reviewing task:', err);
          onCloseModal?.();
        },
      },
    );
  };

  return (
    <div className="relative flex w-[290px] flex-col overflow-hidden rounded-lg border-[1px] border-solid border-grey-100 bg-grey-100 bg-cover bg-center p-[1rem_2rem] text-xl dark:border-slate-800 dark:bg-slate-950 dark:bg-opacity-80 dark:bg-blend-overlay md:w-[850px] md:p-[1rem_2rem]">
      <h5 className="mx-1 items-center text-base font-semibold tracking-wider text-grey-800 dark:text-grey-100 md:mx-auto md:mb-3 md:text-xl">
        Task Details
      </h5>

      <div className="relative z-10 space-y-4 font-mono">
        {/* Name */}
        <div className="flex items-center justify-between">
          <span className="font-medium text-green-800">Name:</span>
          <span
            className="w-3/4 rounded-md border border-green-300 bg-emerald-50 px-3 py-2 outline-none focus:outline-none"
            style={{ minHeight: '45px' }}
          >
            {defaultTaskValues.name}
          </span>
        </div>

        {/* Task Assigned */}
        <div className="flex items-center justify-between">
          <span className="font-medium text-green-800">Task Assigned:</span>
          <span className="w-3/4 rounded-md border border-green-300 bg-emerald-50 px-3 py-2 outline-none focus:outline-none">
            {defaultTaskValues.task}
          </span>
        </div>

        {/* Status */}
        <div className="flex items-center justify-between">
          <span className="font-medium text-green-800">Status:</span>
          <span className="w-3/4 rounded-md border border-green-300 bg-emerald-50 px-3 py-2 outline-none focus:outline-none">
            {defaultTaskValues.status}
          </span>
        </div>

        {/* Last Date to Submit */}
        <div className="flex items-center justify-between">
          <label className="font-medium text-green-800">Deadline:</label>
          <span className="w-3/4 rounded-md border border-green-300 bg-emerald-50 px-3 py-2 outline-none focus:outline-none">
            {defaultTaskValues.deadline}
          </span>
        </div>

        {/* Task Submission Link */}
        <div className="mb-5 mt-5 flex items-center">
          <span className="mr-2 font-medium text-green-800">
            Task Submission Link:
          </span>
          <AiOutlineLink className="text-green-800" />
        </div>
        <div className="mb-5 w-full rounded-md border border-green-300 bg-emerald-50 px-3 py-2 text-green-700 outline-none focus:outline-none">
          <a
            href={defaultTaskValues.googleDriveLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            {defaultTaskValues.googleDriveLink}
          </a>
        </div>

        <div className="mt-7 flex items-center">
          <span className="mr-2 font-medium text-green-800">
            Task Submission Description:
          </span>
          <AiOutlineFileText className="text-green-800" />
        </div>
        <div className="mb-6 h-24 w-full resize-none rounded-md border border-green-300 bg-emerald-50 px-3 py-2 text-green-700 outline-none focus:outline-none">
          {defaultTaskValues.submittedTaskDesc}
        </div>

        <div className="flex items-center justify-between">
          <label className="font-medium text-green-800">
            Task Submitted Date:
          </label>
          <span className="w-3/4 rounded-md border border-green-300 bg-emerald-50 px-3 py-2 outline-none focus:outline-none">
            {defaultTaskValues.submitDate}
          </span>
        </div>
      </div>

      <div className="m-auto flex items-center justify-center gap-9 p-[1rem_0]">
        <Button
          type="reset"
          disabled={disabled || isReviewing}
          onClick={() => handleReview('rejected')}
        >
          <FaTimesCircle className="mr-2" /> Reject
        </Button>
        <Button
          type="danger"
          disabled={disabled || isReviewing}
          onClick={() => handleReview('accepted')}
        >
          <FaCheckCircle className="mr-2" />
          Accept
        </Button>
      </div>
    </div>
  );
}

export default GetFullDetailTask;
