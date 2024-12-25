import { useForm } from 'react-hook-form';
import FormRow from '../../ui/FormRow';
import Button from '../../ui/Button';
import { AiOutlineCalendar } from 'react-icons/ai';
import { FaTasks } from 'react-icons/fa';
import { GiSandsOfTime } from 'react-icons/gi';
import { MdEmail } from 'react-icons/md';
import { useCreateTask } from './useCreateTask';
import { useUpdateTask } from './useUpdateTask';

function CreateTaskForm({ onCloseModal, TaskId, defaultTaskValues }) {
  const { createTask, isAssigning } = useCreateTask();
  const { updateTask, isUpdating } = useUpdateTask();

  const isWorking = isAssigning || isUpdating;
  const isEditSession = Boolean(TaskId);

  const { register, handleSubmit, reset, formState, watch } = useForm({
    mode: 'onChange',
    defaultValues: defaultTaskValues || {
      email: '',
      task: '',
      status: 'Not Started',
      deadline: '',
    },
  });
  const { errors } = formState;

  async function onSubmit(data) {
    const { task, deadline, status } = data;
    if (isEditSession) {
      console.log('TaskId:', TaskId);
      updateTask(
        { status, deadline, task, taskId: TaskId },
        {
          onSuccess: () => {
            console.log('Task updated successfully.');
            reset();
            onCloseModal?.();
          },
          onError: (err) => {
            console.error('Error updating task:', err);
            onCloseModal?.();
          },
        },
      );
    } else {
      // Create Task
      createTask(
        { data },
        {
          onSuccess: () => {
            console.log('Task created successfully.');
            reset();
            onCloseModal?.();
          },
          onError: (err) => {
            console.error('Error creating task:', err);
            onCloseModal?.();
          },
        },
      );
    }
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
        {TaskId ? 'Update Task' : 'Assign Task'}
      </h5>

      <FormRow
        label="Email"
        error={errors?.email?.message}
        icon={<MdEmail className="mr-3 text-2xl text-green-500" />}
      >
        <input
          className="w-[10rem] rounded-md border-[1px] border-solid border-grey-300 bg-grey-0 p-[0.4rem_0.8rem] text-sm tracking-wider shadow-sm dark:border-slate-600 dark:bg-slate-900 dark:text-grey-400"
          type="email"
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
              message: 'Please enter a valid email address',
            },
          })}
          disabled={TaskId ? true : false}
        />
      </FormRow>

      <FormRow
        label="Task"
        error={errors?.task?.message}
        icon={<FaTasks className="mr-3 text-2xl text-green-500" />}
      >
        <input
          className="w-[10rem] rounded-md border-[1px] border-solid border-grey-300 bg-grey-0 p-[0.4rem_0.8rem] text-sm tracking-wider shadow-sm dark:border-slate-600 dark:bg-slate-900 dark:text-grey-400"
          type="text"
          {...register('task', {
            required: 'Task is required',
          })}
        />
      </FormRow>

      <FormRow
        label="Status"
        error={errors?.status?.message}
        icon={<GiSandsOfTime className="mr-3 text-2xl text-green-500" />}
      >
        <select
          className="w-[10rem] rounded-md border-[1px] border-solid border-grey-300 bg-grey-0 p-[0.4rem_0.8rem] text-sm tracking-wider shadow-sm dark:border-slate-600 dark:bg-slate-900 dark:text-grey-400"
          {...register('status')}
        >
          <option value="pending">In Progress</option>
          <option value="accepted">Completed</option>
        </select>
      </FormRow>

      <FormRow
        label="Deadline"
        error={errors?.deadline?.message}
        icon={<AiOutlineCalendar className="mr-3 text-2xl text-green-500" />}
      >
        <input
          className="w-[10rem] rounded-md border-[1px] border-solid border-grey-300 bg-grey-0 p-[0.4rem_0.8rem] text-sm tracking-wider shadow-sm dark:border-slate-600 dark:bg-slate-900 dark:text-grey-400"
          type="date"
          {...register('deadline', {
            required: 'Deadline is required',
          })}
        />
      </FormRow>

      <div className="m-auto flex items-center justify-center gap-9 p-[1rem_0]">
        <Button
          type="danger"
          onClick={() => onCloseModal?.()}
          disabled={isWorking}
        >
          Back
        </Button>
        <Button type="update" disabled={isWorking}>
          {TaskId ? 'Update Task' : 'Assign Task'}
        </Button>
      </div>
    </form>
  );
}

export default CreateTaskForm;
