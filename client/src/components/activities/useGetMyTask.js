import { useQuery } from '@tanstack/react-query';
import { GetMyTasks } from '../../services/apiTask';

export function useGetMyTask() {
  const {
    data: MyTasks,
    isPending: isLoading,
    isError,
  } = useQuery({
    queryKey: ['tasks'],
    queryFn: GetMyTasks,
    retry: false,
  });

  return { MyTasks, isLoading, isError };
}
