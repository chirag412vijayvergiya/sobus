import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { deleteActivity as deleteActivityApi } from '../../services/apiActivity';

export function useDeleteActivity() {
  const queryClient = useQueryClient();
  const navigate = useNavigate(); // Initialize useNavigate hook
  const { isPending: isDeleting, mutate: deleteActivity } = useMutation({
    mutationFn: deleteActivityApi,
    onSuccess: () => {
      toast.success('Activity successfully deleted');
      queryClient.invalidateQueries({
        queryKey: ['Activity'],
      });
      queryClient.invalidateQueries({
        queryKey: ['activities'],
      });
      navigate('/');
    },
    onError: (err) => toast.error(err.message),
  });

  return { isDeleting, deleteActivity };
}
