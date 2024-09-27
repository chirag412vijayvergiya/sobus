import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { GetTasks as GetTasksApi } from '../../services/apiTask';

export function useGetTaskActivity() {
  const { activityId } = useParams();
  const {
    data: tasks,
    isPending: isLoading,
    isError,
  } = useQuery({
    queryKey: ['tasks', activityId],
    queryFn: () => GetTasksApi(activityId),
    retry: false,
  });

  return { tasks, isLoading, isError };
}
