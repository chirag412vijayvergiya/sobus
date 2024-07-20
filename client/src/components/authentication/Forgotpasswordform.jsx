import { useForm } from 'react-hook-form';
import FormRow from '../../ui/FormRow';
import Button from '../../ui/Button';
import { useState } from 'react';
// import { useForgotPasswordPatient } from './Patients/useForgotPasswordPatient';
// import { useResetPasswordPatient } from './Patients/useResetPasswordPatient';
// import { useForgotPasswordDoctor } from './Doctors/useForgotPasswordDoctor';
// import { useResetPasswordDoctor } from './Doctors/useResetPasswordDoctor';

function Forgotpasswordform({ onCloseModal, patient = '' }) {
  const [resetPasswordForm, setResetPasswordForm] = useState(false);
  // const { isSending1, forgotPasswordPatient } = useForgotPasswordPatient();
  // const { isReseting1, resetPasswordPatient } = useResetPasswordPatient();
  // const { isSending2, forgotPasswordDoctor } = useForgotPasswordDoctor();
  // const { isReseting2, resetPasswordDoctor } = useResetPasswordDoctor();

  const isSending1 = false;
  const isReseting1 = false;
  const isSending2 = false;
  const isReseting2 = false;

  const { register, handleSubmit, reset, formState, watch } = useForm();
  const { errors } = formState;

  const isSending = isSending1 || isSending2;
  const isReseting = isReseting1 || isReseting2;

  const onSubmit = (data) => {
    if (!resetPasswordForm) {
      // patient ? forgotPasswordPatient(data) : forgotPasswordDoctor(data);
    } else {
      // patient ? resetPasswordPatient(data) : resetPasswordDoctor(data);
    }
  };

  return (
    <form
      className="relative flex w-[310px] flex-col overflow-hidden rounded-lg border-[1px] border-solid border-grey-100 bg-grey-0 p-[1rem_2rem] text-xl dark:border-slate-800 dark:bg-slate-900 md:w-[450px] md:p-[1rem_2rem]"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="text-center font-mono md:mb-3">
        <h5 className="mx-1 items-center text-base font-medium tracking-wider text-grey-800 dark:text-grey-100 md:mx-auto md:text-xl">
          Forgot Your Password ?
        </h5>
        <p className="text-sm text-gray-700 dark:text-gray-400">
          We'll email you a token so you can reset your password. Please enter
        </p>
      </div>
      {!resetPasswordForm ? (
        <>
          <FormRow label="Email Id" error={errors?.emailId?.message}>
            <input
              className="w-[10rem] rounded-md border-[1px] border-solid border-grey-300 bg-grey-0 p-[0.4rem_0.8rem] text-sm tracking-wider shadow-sm dark:border-slate-600 dark:bg-slate-900 dark:text-grey-400"
              type="text"
              id="emailId"
              disabled={isSending}
              {...register('emailId', { required: 'Email is required' })}
            />
          </FormRow>
          <div className="flex items-center justify-center gap-3 p-[0.7rem_0] md:justify-center md:p-[1.2rem_0]">
            <Button
              type="reset"
              onClick={() => onCloseModal?.()}
              disabled={isSending}
            >
              Back
            </Button>
            <Button type="update" disabled={isSending}>
              Reset Password
            </Button>
          </div>
        </>
      ) : (
        <>
          <FormRow label="Token" error={errors?.token?.message}>
            <input
              className="w-[10rem] rounded-md border-[1px] border-solid border-grey-300 bg-grey-0 p-[0.4rem_0.8rem] text-sm tracking-wider shadow-sm dark:border-slate-600 dark:bg-slate-900 dark:text-grey-400"
              type="text"
              id="token"
              disabled={isReseting}
              {...register('token', { required: 'Token is required' })}
            />
          </FormRow>
          <FormRow label="New Password" error={errors?.newpassword?.message}>
            <input
              className="w-[10rem] rounded-md border-[1px] border-solid border-grey-300 bg-grey-0 p-[0.4rem_0.8rem] text-sm tracking-wider shadow-sm dark:border-slate-600 dark:bg-slate-900 dark:text-grey-400"
              type="text"
              id="newpassword"
              disabled={isReseting}
              {...register('newpassword', {
                required: 'New password is required',
              })}
            />
          </FormRow>
          <FormRow
            label="Confirm New Password"
            error={errors?.ConfirmPassword?.message}
          >
            <input
              className="w-[10rem] rounded-md border-[1px] border-solid border-grey-300 bg-grey-0 p-[0.4rem_0.8rem] text-sm tracking-wider shadow-sm dark:border-slate-600 dark:bg-slate-900 dark:text-grey-400"
              type="text"
              id="ConfirmPassword"
              disabled={isReseting}
              {...register('ConfirmPassword', {
                required: 'Confirm password is required',
                validate: (value) =>
                  value === watch('newpassword') || 'Passwords do not match',
              })}
            />
          </FormRow>
          <div className="flex items-center justify-center gap-3 p-[0.7rem_0] md:justify-center md:p-[1.2rem_0]">
            <Button
              type="reset"
              onClick={() => onCloseModal?.()}
              disabled={isReseting}
            >
              Back
            </Button>
            <Button type="update" disabled={isReseting}>
              Reset Password
            </Button>
          </div>
        </>
      )}
    </form>
  );
}

export default Forgotpasswordform;
