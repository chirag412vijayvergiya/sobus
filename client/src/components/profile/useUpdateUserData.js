import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { updateUserData } from '../../services/apiUser';

export function useUpdateUserData() {
  const queryClient = useQueryClient();

  const { mutate: updateUser, isPending: isUpdating } = useMutation({
    mutationFn: updateUserData,
    onSuccess: () => {
      toast.success('User account successfully updated');
      queryClient.invalidateQueries('user');
    },
    onError: (err) => toast.error(err.message),
  });

  return { updateUser, isUpdating };
}
