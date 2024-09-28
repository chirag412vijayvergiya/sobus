import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { CreateTask as createTaskApi } from '../../services/apiTask';
import { useParams } from 'react-router-dom';

export function useCreateTask() {
  const queryClient = useQueryClient();
  const { activityId } = useParams();
  const { mutate: createTask, isPending: isAssigning } = useMutation({
    mutationFn: async (data) => createTaskApi({ data, activityId }),
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
