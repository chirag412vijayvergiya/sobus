import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { createActivity as createActivityApi } from '../../services/apiActivity';

export function useCreateActivity() {
  const queryClient = useQueryClient();
  const { mutate: createActivity, isPending: isBooking } = useMutation({
    mutationFn: createActivityApi,
    onSuccess: (data) => {
      toast.success('Activity successfully created!');
      queryClient.invalidateQueries({
        queryKey: ['activities'],
      });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { createActivity, isBooking };
}
