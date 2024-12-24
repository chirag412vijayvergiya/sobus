import toast from 'react-hot-toast';
import Button from '../../ui/Button';
import { useReviewTask } from '../Task/useReviewTask';

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

      <div className="m-auto flex items-center justify-center gap-9 p-[1rem_0]">
        <Button
          type="reset"
          disabled={disabled || isReviewing}
          onClick={() => handleReview('rejected')}
        >
          Reject
        </Button>
        <Button
          type="danger"
          disabled={disabled || isReviewing}
          onClick={() => handleReview('accepted')}
        >
          Accept
        </Button>
      </div>
    </div>
  );
}

export default GetFullDetailTask;
