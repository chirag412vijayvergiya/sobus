import { useMutation, useQueryClient } from '@tanstack/react-query';
import { SubmitTask as SubmitTaskApi } from '../../services/apiTask';
import toast from 'react-hot-toast';

export function useSubmitTask() {
  const queryClient = useQueryClient();
  const { mutate: submitTask, isLoading: isSubmitting } = useMutation({
    mutationFn: SubmitTaskApi,
    onSuccess: () => {
      toast.success('Task successfully Submitted');
      queryClient.invalidateQueries({
        queryKey: ['tasks'],
      });
    },
    onError: (err) => toast.error(err.message || 'Failed to submit task'),
  });

  return { submitTask, isSubmitting };
}
