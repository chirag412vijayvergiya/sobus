import { useForm } from 'react-hook-form';
import FormRow from '../../ui/FormRow';
import Button from '../../ui/Button';
import { useCreateActivity } from './useCreateActivity';

function CreateActivityForm({ onCloseModal }) {
  const { isBooking, createActivity } = useCreateActivity();

  const defaultValues = {
    activityName: '',
    activityStartDate: '',
    activityEndDate: '',
    activityTime: '10:00 - 10:30',
    activityDescription: '',
    activityLocation: '',
    GoogleFormLink: '',
  };

  const { register, handleSubmit, reset, formState, watch } = useForm({
    mode: 'onChange',
    defaultValues: defaultValues,
  });
  const { errors } = formState;

  async function onSubmit(data) {
    console.log(data);
    try {
      createActivity(
        {
          data,
        },
        {
          onSuccess: () => {
            console.log('Activity created successfully.');
            reset();
            onCloseModal?.();
          },
          onError: (err) => {
            console.error('Error creating activity:', err);
            onCloseModal?.();
          },
        },
      );
    } catch (err) {
      console.log(err);
    }
  }

  function onError(errors) {
    console.log(errors);
  }

  const timeSlots = [
    '10:00 - 10:30',
    '10:30 - 11:00',
    '11:00 - 11:30',
    '11:30 - 12:00',
    '12:00 - 12:30',
    '12:30 - 13:00',
    '13:00 - 13:30',
    '13:30 - 14:00',
    '14:00 - 14:30',
    '14:30 - 15:00',
    '15:00 - 15:30',
    '15:30 - 16:00',
    '16:00 - 16:30',
    '16:30 - 17:00',
  ];

  let currentDate = new Date();
  currentDate.setDate(currentDate.getDate() + 1);
  currentDate = currentDate.toISOString().split('T')[0];

  const startDate = watch('activityStartDate');
  const endDate = watch('activityEndDate');

  return (
    <form
      className="relative flex w-[310px] flex-col overflow-hidden rounded-lg border-[1px] border-solid border-grey-100 bg-green-100 p-[1rem_2rem] text-xl dark:border-slate-800 dark:bg-slate-900 md:w-full md:p-[2.4rem_3rem]"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h5 className="mx-1 items-center text-base font-semibold tracking-wider text-grey-800 dark:text-grey-100 md:mx-auto md:mb-3 md:text-xl">
        Create New Activity
      </h5>
      <FormRow label="Activity Name" error={errors?.activityName?.message}>
        <input
          className="w-[12rem] rounded-md border-[1px] border-solid border-grey-300 bg-grey-0 p-[0.4rem_0.8rem] text-sm tracking-wider shadow-sm dark:border-slate-600 dark:bg-slate-900 dark:text-grey-400"
          type="text"
          id="activityName"
          {...register('activityName', {
            required: 'This field is required',
          })}
        />
      </FormRow>

      <FormRow
        label="Activity Start Date"
        error={errors?.activityStartDate?.message}
      >
        <input
          className="w-[12rem] rounded-md border-[1px] border-solid border-grey-300 bg-transparent p-[0.4rem_0.8rem] text-sm tracking-wider shadow-sm dark:border-slate-600 dark:text-grey-400"
          type="date"
          id="activityStartDate"
          {...register('activityStartDate', {
            required: 'This field is required',
            pattern: {
              value: /\d{4}-\d{2}-\d{2}/,
              message: 'Please enter a date in the format YYYY-MM-DD',
            },
            min: {
              value: currentDate,
              message: 'Please select a date after today.',
            },
          })}
          disabled={isBooking}
        />
      </FormRow>
      <FormRow
        label="Activity End Date"
        error={errors?.activityEndDate?.message}
      >
        <input
          className="w-[12rem] rounded-md border-[1px] border-solid border-grey-300 bg-transparent p-[0.4rem_0.8rem] text-sm tracking-wider shadow-sm dark:border-slate-600 dark:text-grey-400"
          type="date"
          id="activityEndDate"
          {...register('activityEndDate', {
            required: 'This field is required',
            pattern: {
              value: /\d{4}-\d{2}-\d{2}/,
              message: 'Please enter a date in the format YYYY-MM-DD',
            },
            min: {
              value: startDate || currentDate,
              message:
                'Please select a date after the start date of the activity.',
            },
          })}
          disabled={isBooking}
        />
      </FormRow>
      <FormRow label="Activity Time" error={errors?.appointmentTime?.message}>
        <select
          className="w-[12rem] rounded-md border-[1px] border-solid border-grey-300 bg-grey-0 p-[0.4rem_0.8rem] text-sm tracking-wider shadow-sm dark:border-slate-600 dark:bg-slate-900 dark:text-grey-400"
          id="activityTime"
          type="time"
          disabled={isBooking}
          {...register('activityTime', {
            required: 'This field is required',
          })}
        >
          {timeSlots.map((slot, index) => (
            <option key={index} value={slot}>
              {slot}
            </option>
          ))}
        </select>
      </FormRow>
      <FormRow
        label="Activity Description"
        error={errors?.activityDescription?.message}
      >
        <textarea
          className="h-[5rem] w-[12rem] rounded-md border-[1px] border-solid border-grey-300 bg-grey-0 p-[0.8rem_1.2rem] text-sm tracking-wide shadow-sm dark:border-slate-700 dark:bg-slate-900 dark:text-grey-400"
          placeholder="Please describe about activity"
          disabled={isBooking}
          id="activityDescription"
          {...register('activityDescription', {
            required: 'This field is required',
          })}
        />
      </FormRow>
      <FormRow
        label="Activity Location"
        error={errors?.activityLocation?.message}
      >
        <input
          className="w-[12rem] rounded-md border-[1px] border-solid border-grey-300 bg-grey-0 p-[0.4rem_0.8rem] text-sm tracking-wider shadow-sm dark:border-slate-600 dark:bg-slate-900 dark:text-grey-400"
          type="text"
          id="activityLocation"
          {...register('activityLocation', {
            required: 'This field is required',
          })}
        />
      </FormRow>
      <FormRow label="Google Form Link" error={errors?.GoogleFormLink?.message}>
        <input
          className="w-[12rem] rounded-md border-[1px] border-solid border-grey-300 bg-grey-0 p-[0.4rem_0.8rem] text-sm tracking-wider shadow-sm dark:border-slate-600 dark:bg-slate-900 dark:text-grey-400"
          type="text"
          id="GoogleFormLink"
          {...register('GoogleFormLink', {
            required: 'This field is required',
            pattern: {
              value: /^https:\/\/.*/,
              message: 'The link must start with https://',
            },
          })}
        />
      </FormRow>

      <div className="flex justify-center gap-3 p-[0.7rem_0] md:justify-center md:p-[1.2rem_0]">
        <Button
          type="reset"
          onClick={() => onCloseModal?.()}
          disabled={isBooking}
        >
          Back
        </Button>

        <a
          href="https://docs.google.com/forms/u/0/"
          target="_blank"
          rel="noopener noreferrer"
          className="p-small ml-auto flex items-center justify-center rounded-md bg-indigo-800 px-3 py-2 font-mono text-sm font-medium tracking-wider text-grey-50 dark:bg-green-500 md:px-6"
        >
          Make Form
        </a>

        <Button type="update" disabled={isBooking}>
          Create Activity
        </Button>
      </div>
    </form>
  );
}

export default CreateActivityForm;
