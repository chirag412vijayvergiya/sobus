import { useMutation, useQueryClient } from '@tanstack/react-query';
import { UpdateTask as UpdateTaskApi } from '../../services/apiTask';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';

export function useUpdateTask() {
  const queryClient = useQueryClient();
  const { activityId } = useParams(); // Ensure 'activityId' is defined in your route
  const { mutate: updateTask, isLoading: isUpdating } = useMutation({
    mutationFn: UpdateTaskApi,
    onSuccess: () => {
      toast.success('Task successfully updated');
      // Invalidate queries related to the task list or specific task
      queryClient.invalidateQueries({
        queryKey: ['tasks', activityId], // Ensure this key matches the task query key in your app
      });
    },
    onError: (err) => toast.error(err.message || 'Failed to update task'),
  });

  return { updateTask, isUpdating };
}
