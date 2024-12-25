import toast from 'react-hot-toast';
import Button from '../../ui/Button';
import { useReviewTask } from '../Task/useReviewTask';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import FormRow from '../../ui/FormRow';

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
    <div className="relative flex w-[310px] flex-col overflow-hidden rounded-lg border-[1px] border-solid border-grey-100 bg-green-100 p-[0.5rem_1rem] text-xl dark:border-slate-800 dark:bg-slate-900 md:w-full md:p-[2.4rem_3rem]">
      {/* Header */}
      <div className="rounded-lg bg-gradient-to-r from-green-500 to-green-700 px-2 py-2 shadow-lg">
        <h2 className="text-center text-base font-semibold tracking-wider text-grey-800 dark:text-grey-100 md:mx-auto md:mb-1 md:text-xl">
          Task Details
        </h2>
      </div>

      <FormRow label="Task Name">
        <input
          className="w-[12rem] rounded-md border-[1px] border-solid border-grey-300 bg-transparent p-[0.4rem_0.8rem] text-sm tracking-wider shadow-sm dark:border-slate-600 dark:text-grey-400"
          type="text"
          disabled
          value={defaultTaskValues.name || 'N/A'}
        />
      </FormRow>

      <FormRow label="Task Assigned">
        <input
          className="w-[12rem] rounded-md border-[1px] border-solid border-grey-300 bg-transparent p-[0.4rem_0.8rem] text-sm tracking-wider shadow-sm dark:border-slate-600 dark:text-grey-400"
          type="text"
          disabled
          value={defaultTaskValues.task || 'N/A'}
        />
      </FormRow>

      <FormRow label="Status">
        <input
          className="w-[12rem] rounded-md border-[1px] border-solid border-grey-300 bg-transparent p-[0.4rem_0.8rem] text-sm tracking-wider shadow-sm dark:border-slate-600 dark:text-grey-400"
          type="text"
          disabled
          value={defaultTaskValues.status || 'N/A'}
        />
      </FormRow>

      <FormRow label="Deadline">
        <input
          className="w-[12rem] rounded-md border-[1px] border-solid border-grey-300 bg-transparent p-[0.4rem_0.8rem] text-sm tracking-wider shadow-sm dark:border-slate-600 dark:text-grey-400"
          type="text"
          disabled
          value={defaultTaskValues.deadlinefortasksub || 'N/A'}
        />
      </FormRow>

      {defaultTaskValues.submittedTaskDesc ||
      defaultTaskValues.googleDriveLink ? (
        <>
          <FormRow label="Submission Link">
            <a
              href={defaultTaskValues.googleDriveLink || '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="dark:text-grey-400mt-2 inline-block w-[12rem] rounded-md border-[1px] border-solid border-grey-300 bg-transparent p-[0.4rem_0.8rem] text-sm tracking-wider text-blue-600 shadow-sm hover:text-blue-800 dark:border-slate-600 dark:text-blue-400 dark:hover:text-blue-600"
            >
              {defaultTaskValues.googleDriveLink || 'No link provided'}
            </a>
          </FormRow>

          <FormRow label="Submission Description">
            <textarea
              className="h-[5rem] w-[12rem] rounded-md border-[1px] border-solid border-grey-300 bg-transparent p-[0.4rem_0.8rem] text-sm tracking-wider shadow-sm dark:border-slate-600 dark:text-grey-400"
              disabled
              value={
                defaultTaskValues.submittedTaskDesc || 'No description provided'
              }
            />
          </FormRow>

          <FormRow label="Submitted Date">
            <input
              className="w-[12rem] rounded-md border-[1px] border-solid border-grey-300 bg-transparent p-[0.4rem_0.8rem] text-sm tracking-wider shadow-sm dark:border-slate-600 dark:text-grey-400"
              type="text"
              disabled
              value={defaultTaskValues.submitDate || 'N/A'}
            />
          </FormRow>

          <div className="m-auto flex items-center justify-center gap-9 p-[0.5rem_0]">
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
        </>
      ) : (
        <div className="rounded-md border border-dashed border-gray-300 bg-yellow-50 p-4 text-center shadow-md dark:border-yellow-600 dark:bg-yellow-900">
          <p className="mb-2 text-xl font-semibold text-yellow-800 dark:text-yellow-300">
            Task Not Submitted
          </p>
          <p className="text-sm text-yellow-700 dark:text-yellow-400">
            The user has not submitted this task yet. Please follow up if
            necessary.
          </p>
        </div>
      )}
    </div>
  );
}

export default GetFullDetailTask;
