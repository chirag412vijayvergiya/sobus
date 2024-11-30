import { useQuery } from '@tanstack/react-query';
import { getAllUsers } from '../../services/apiUser';

export function useGetAllUsers() {
  const { isPending, data: users } = useQuery({
    queryKey: ['activities'],
    queryFn: getAllUsers,
    retry: 0,
  });

  return { isPending, users };
}
