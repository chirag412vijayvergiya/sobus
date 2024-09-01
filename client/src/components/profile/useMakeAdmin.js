import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { MakeAdmin as MakeAdminApi } from '../../services/apiUser';

export function useMakeAdmin() {
  const { mutate: MakeAdmin, isPending: isUpdating } = useMutation({
    mutationFn: MakeAdminApi,
    onSuccess: () => {
      toast.success('Admin Functionality Added');
    },
    onError: (err) => toast.error(err.message),
  });

  return { MakeAdmin, isUpdating };
}
