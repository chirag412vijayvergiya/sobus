import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { signup as signupApi } from '../../services/apiAuth';
import toast from 'react-hot-toast';

export function useSignup() {
  const navigate = useNavigate();
  const { mutate: signup, isPending } = useMutation({
    mutationFn: signupApi,
    onSuccess: (data) => {
      toast.success('Account successfully created!');
      navigate('/home');
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { signup, isPending };
}
