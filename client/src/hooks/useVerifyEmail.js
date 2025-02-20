import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import { verifyEmail as verifyEmailt } from '../services/apiAuth';

export function useVerifyEmail() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const {
    isPending,
    data: verifyEmail,
    error,
  } = useQuery({
    queryKey: ['verifyEmail', token],
    queryFn: () => verifyEmailt(token),
    enabled: !!token,
  });
  return { isPending, verifyEmail, error };
}
