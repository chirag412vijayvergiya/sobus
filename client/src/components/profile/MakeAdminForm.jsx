import { useForm } from 'react-hook-form';
import Button from '../../ui/Button';
import FormRow from '../../ui/FormRow';
import { useMakeAdmin } from './useMakeAdmin';

function MakeAdminForm({ onCloseModal }) {
  const { register, handleSubmit, reset, formState } = useForm();
  const { MakeAdmin, isUpdating } = useMakeAdmin();
  const { errors } = formState;

  function onSubmit(data) {
    console.log(data);
    try {
      MakeAdmin(
        {
          emailId: data.emailId,
        },
        {
          onSuccess: () => {
            console.log('Admin Functionality Added');
            reset();
            onCloseModal?.();
          },
          onError: (err) => {
            console.error('Error making admin:', err);
            onCloseModal?.();
          },
        },
      );
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <form
      className="relative flex w-[310px] flex-col overflow-hidden rounded-lg border-[1px] border-solid border-grey-100 bg-grey-0 p-[1rem_2rem] text-xl dark:border-slate-800 dark:bg-slate-900 md:w-[450px] md:p-[1rem_2rem]"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="text-center font-mono md:mb-3">
        <h5 className="mx-1 items-center text-base font-medium tracking-wider text-grey-800 dark:text-grey-100 md:mx-auto md:text-xl">
          Make Admin
        </h5>
        <p className="text-sm text-gray-700 dark:text-gray-400">
          Are you sure you want to make this user an admin?
        </p>
      </div>

      <FormRow label="Email Id" error={errors?.emailId?.message}>
        <input
          className="w-[10rem] rounded-md border-[1px] border-solid border-grey-300 bg-grey-0 p-[0.4rem_0.8rem] text-sm tracking-wider shadow-sm dark:border-slate-600 dark:bg-slate-900 dark:text-grey-400"
          type="text"
          id="emailId"
          //   disabled={isSending}
          {...register('emailId', { required: 'Email is required' })}
        />
      </FormRow>
      <div className="m-auto flex items-center justify-center gap-9 p-[1rem_0]">
        <Button type="reset" disabled={isUpdating} onClick={onCloseModal}>
          Cancel
        </Button>
        <Button type="danger" disabled={isUpdating}>
          Make Admin
        </Button>
      </div>
    </form>
  );
}

export default MakeAdminForm;
