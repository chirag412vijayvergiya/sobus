// import { useMutation } from '@tanstack/react-query';
// import toast from 'react-hot-toast';
// // import { resetPasswordPatient as resetPasswordApi } from '../../../services/apiAuthPatient';
// import { useNavigate } from 'react-router-dom';

// export function useResetPasswordPatient() {
//   const navigate = useNavigate();
//   const { mutate: resetPassword, isPending: isReseting1 } = useMutation({
//     // mutationFn: resetPasswordApi,
//     onSuccess: (data) => {
//       toast.success('Your password has been reset!');
//       navigate('/dashboard', { replace: true });
//     },
//     onError: (error) => {
//       toast.error(error.message);
//     },
//   });
//   return { isReseting1, resetPasswordPatient };
// }
