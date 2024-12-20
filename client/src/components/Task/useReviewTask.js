import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ReviewTask as ReviewTaskApi } from '../../services/apiTask';
import toast from 'react-hot-toast';

export function useReviewTask() {
  const queryClient = useQueryClient();
  const { mutate: reviewTask, isLoading: isReviewing } = useMutation({
    mutationFn: ReviewTaskApi,
    onSuccess: () => {
      toast.success('Task successfully Reviewed');
      queryClient.invalidateQueries({
        queryKey: ['tasks'],
      });
    },
    onError: (err) =>
      toast.error(err.message || 'Failed to update after review task'),
  });

  return { reviewTask, isReviewing };
}
