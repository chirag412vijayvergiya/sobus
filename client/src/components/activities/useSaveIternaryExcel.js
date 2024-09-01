import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import { saveIternaryExcel } from '../../services/apiActivity';

export function useSaveIternaryExcel() {
  const { activityId } = useParams();
  const queryClient = useQueryClient();

  console.log('activityId', activityId);

  const { mutate: CreateIternaryExcel, isLoading: isCreating } = useMutation({
    mutationFn: (data) => saveIternaryExcel({ ...data, activityId }), // Pass the data and activityId to saveExcel
    onSuccess: () => {
      toast.success('Iternary sheet successfully created!');
      queryClient.invalidateQueries({
        queryKey: ['activities'], // Invalidate the cache for activities
      });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { CreateIternaryExcel, isCreating };
}
