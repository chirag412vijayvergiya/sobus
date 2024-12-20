import { useForm } from 'react-hook-form';
import FormRow from '../../ui/FormRow';
import Button from '../../ui/Button';
import { FaTasks } from 'react-icons/fa';
import { MdLink } from 'react-icons/md';
import { useSubmitTask } from './useSubmitTask';

function TaskSubmissionForm({ onCloseModal, TaskId, defaultTaskValues = '' }) {
  const { submitTask, isSubmitting } = useSubmitTask();

  const { register, handleSubmit, reset, formState, watch } = useForm({
    mode: 'onChange',
    defaultValues: defaultTaskValues || {
      abouttask: '',
      googleDriveLink: '',
    },
  });
  const { errors } = formState;

  async function onSubmit(data) {
    const { abouttask, googleDriveLink } = data;
    console.log('TaskId:', TaskId);
    submitTask(
      { taskId: TaskId, abouttask, googleDriveLink },
      {
        onSuccess: () => {
          console.log('Task submitted successfully.');
          reset({
            abouttask: '',
            googleDriveLink: '',
          });
          onCloseModal?.();
        },
        onError: (err) => {
          console.error('Error submitting task:', err);
          onCloseModal?.();
        },
      },
    );
  }

  return (
    <form
      className="relative flex w-[290px] flex-col overflow-hidden rounded-lg border-[1px] border-solid border-grey-100 bg-grey-100 bg-cover bg-center p-[1rem_2rem] text-xl dark:border-slate-800 dark:bg-slate-950 dark:bg-opacity-80 dark:bg-blend-overlay md:w-[450px] md:p-[1rem_2rem]"
      style={{
        backgroundImage: `url('/28518.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundBlendMode: 'overlay',
      }}
      onSubmit={handleSubmit(onSubmit)}
    >
      <h5 className="mx-1 items-center text-base font-semibold tracking-wider text-grey-800 dark:text-grey-100 md:mx-auto md:mb-3 md:text-xl">
        Submit your task
      </h5>

      <FormRow
        label="Your work"
        error={errors?.abouttask?.message}
        icon={<FaTasks className="mr-3 text-2xl text-green-500" />}
      >
        <input
          className="w-[10rem] rounded-md border-[1px] border-solid border-grey-300 bg-grey-0 p-[0.4rem_0.8rem] text-sm tracking-wider shadow-sm dark:border-slate-600 dark:bg-slate-900 dark:text-grey-400"
          type="text"
          placeholder="Describe your work here"
          {...register('abouttask', {
            required: 'Your work description is required',
          })}
        />
      </FormRow>

      <FormRow
        label="Google Drive Link"
        error={errors?.googleDriveLink?.message}
        icon={<MdLink className="mr-3 text-2xl text-blue-500" />}
      >
        <div className="flex flex-col gap-2">
          <input
            className="w-[10rem] rounded-md border-[1px] border-solid border-grey-300 p-[0.4rem_0.8rem] text-sm tracking-wider shadow-sm dark:border-slate-600 dark:bg-slate-900 dark:text-grey-400"
            type="url"
            placeholder="https://..."
            {...register('googleDriveLink', {
              required: 'Google Drive link is required',
              pattern: {
                value: /^https:\/\//i,
                message: 'Link should start with https://',
              },
            })}
          />
          <p className="font-mono text-xs text-grey-600 dark:text-grey-400">
            Upload your task as a PDF or image to Google Drive. Then, share the
            link here.
          </p>
        </div>
      </FormRow>

      <div className="m-auto flex items-center justify-center gap-9 p-[1rem_0]">
        <Button
          type="danger"
          onClick={() => onCloseModal?.()}
          disabled={isSubmitting}
        >
          Back
        </Button>
        <Button type="update" disabled={isSubmitting}>
          Submit Task
        </Button>
      </div>
    </form>
  );
}

export default TaskSubmissionForm;
