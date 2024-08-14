import { useQuery } from '@tanstack/react-query';
import { getAllActivities } from '../../services/apiActivity';

export function useGetAllActivities() {
  const { isPending, data: activities } = useQuery({
    queryKey: ['activities'],
    queryFn: getAllActivities,
    retry: 0,
  });

  return { isPending, activities };
}
