import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { GetActivity } from '../../services/apiActivity';

export function useGetActivity() {
  const { activityId } = useParams();
  const {
    isPending,
    data: activity,
    error,
  } = useQuery({
    queryKey: ['Activity', activityId],
    queryFn: () => GetActivity(activityId),
    retry: false,
  });
  return { isPending, activity, error };
}
