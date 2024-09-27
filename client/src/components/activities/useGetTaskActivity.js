import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { GetTasks as GetTasksApi } from '../../services/apiTask';

export function useGetTaskActivity() {
  const { activityId } = useParams();
  const {
    data: tasks,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['tasks', activityId],
    queryFn: () => GetTasksApi(activityId),
    retry: false,
  });

  return { tasks, isLoading, isError, error };
}
