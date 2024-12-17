import { useMutation } from '@tanstack/react-query';
import { forgotPassword as forgotPasswordApi } from '../../services/apiAuth';
import toast from 'react-hot-toast';

export function useForgotPassword() {
  const { mutate: forgotPassword, isPending: isSending } = useMutation({
    mutationFn: forgotPasswordApi,
    onSuccess: (data) => {
      toast.success('Reset token sent to your email address!');
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  return { isSending, forgotPassword };
}
