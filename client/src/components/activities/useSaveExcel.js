import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import { saveExcel } from '../../services/apiActivity';

export function useSaveExcel() {
  const { activityId } = useParams();
  const queryClient = useQueryClient();

  console.log('activityId', activityId);

  const { mutate: CreateExcel, isLoading: isBooking } = useMutation({
    mutationFn: (data) => saveExcel({ ...data, activityId }), // Pass the data and activityId to saveExcel
    onSuccess: () => {
      toast.success('Excel sheet successfully created!');
      queryClient.invalidateQueries({
        queryKey: ['activities'], // Invalidate the cache for activities
      });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { CreateExcel, isBooking };
}
