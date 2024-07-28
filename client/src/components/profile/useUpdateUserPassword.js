import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { UpdateUserPassword } from '../../services/apiUser';

export function useUpdateUserPassword() {
  const queryClient = useQueryClient();

  const { mutate: updateUserPassword, isPending: isUpdating } = useMutation({
    mutationFn: UpdateUserPassword,
    onSuccess: () => {
      toast.success('User password successfully updated');
      queryClient.invalidateQueries('user');
    },
    onError: (err) => toast.error(err.message),
  });

  return { updateUserPassword, isUpdating };
}
