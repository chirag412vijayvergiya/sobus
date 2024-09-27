import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { DeleteTask as deleteTaskApi } from '../../services/apiTask';

export function useDeleteTask() {
  const queryClient = useQueryClient();
  const navigate = useNavigate(); // Initialize useNavigate hook
  const { isPending: isDeleting, mutate: deleteTask } = useMutation({
    mutationFn: deleteTaskApi,
    onSuccess: () => {
      toast.success('Task successfully deleted');
      queryClient.invalidateQueries({
        queryKey: ['tasks'],
      });
      //   queryClient.invalidateQueries({
      //     queryKey: [''],
      //   });
      navigate('/');
    },
    onError: (err) => toast.error(err.message),
  });

  return { isDeleting, deleteTask };
}
