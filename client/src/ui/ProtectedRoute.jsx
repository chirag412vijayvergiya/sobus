import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import DefaultSpinner from './DefaultSpinner';
import { useUser } from '../components/profile/useUser';

function ProtectedRoute({ children, roles = [] }) {
  const navigate = useNavigate();

  //1. Load the authenticated user
  const { isPending, isAuthenticated, user } = useUser();

  //2. If there no authenticated user, redirect to the /login page
  useEffect(
    function () {
      if (!isAuthenticated && !isPending) {
        navigate('/login');
      } else if (
        isAuthenticated &&
        !isPending &&
        roles.length > 0 &&
        !roles.includes(user?.data?.data?.role)
      ) {
        navigate('/home');
      }
    },
    [isAuthenticated, isPending, navigate, roles, user?.data?.data?.role],
  );

  //3. While Loading, show a spinner
  if (isPending) {
    return (
      <div className="flex h-[100vh] items-center justify-center bg-gray-50 dark:bg-slate-800">
        <DefaultSpinner />
      </div>
    );
  }

  if (
    isAuthenticated &&
    (!roles.length || roles.includes(user?.data?.data?.role))
  )
    return children;
}

export default ProtectedRoute;
