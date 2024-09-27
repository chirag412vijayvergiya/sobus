import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { CreateTask as createTaskApi } from '../../services/apiTask';

export function useCreateTask() {
  const queryClient = useQueryClient();
  const { mutate: createTask, isPending: isAssigning } = useMutation({
    mutationFn: createTaskApi,
    onSuccess: (data) => {
      toast.success('Task successfully Assigned!');
      queryClient.invalidateQueries({
        queryKey: ['tasks', data.activityId],
      });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { createTask, isAssigning };
}
