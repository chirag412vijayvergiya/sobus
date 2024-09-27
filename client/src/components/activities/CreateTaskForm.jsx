import { useForm } from 'react-hook-form';
import FormRow from '../../ui/FormRow';
import Button from '../../ui/Button';
import { AiOutlineCalendar } from 'react-icons/ai';
import { FaTasks } from 'react-icons/fa';
import { GiSandsOfTime } from 'react-icons/gi';
import { MdEmail } from 'react-icons/md';
import { useCreateTask } from './useCreateTask';

function CreateTaskForm({ onCloseModal }) {
  const { createTask, isAssigning } = useCreateTask();
  const { register, handleSubmit, reset, formState, watch } = useForm({
    mode: 'onChange',
    defaultValues: {
      email: '',
      task: '',
      status: 'Not Started',
      deadline: '',
    },
  });
  const { errors } = formState;

  async function onSubmit(data) {
    console.log(data);
    // Handle task assignment here (e.g., send data to API)
    reset();
    onCloseModal?.();
  }

  function onError(errors) {
    console.log(errors);
  }
  return (
    <form
      className="relative flex w-[290px] flex-col overflow-hidden rounded-lg border-[1px] border-solid border-grey-100 bg-green-100 p-[1rem_2rem] text-xl dark:border-slate-800 dark:bg-slate-900 md:w-[450px] md:p-[1rem_2rem]"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h5 className="mx-1 items-center text-base font-semibold tracking-wider text-grey-800 dark:text-grey-100 md:mx-auto md:mb-3 md:text-xl">
        Assign Task
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
          <option value="completed">Completed</option>
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
          type="reset"
          onClick={() => onCloseModal?.()}
          //   disabled={isBooking}
        >
          Back
        </Button>
        <Button
          type="update"
          // disabled={isBooking}
        >
          Assign Task
        </Button>
      </div>
    </form>
  );
}

export default CreateTaskForm;
