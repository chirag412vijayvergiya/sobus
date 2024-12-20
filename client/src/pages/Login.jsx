import { useNavigate } from 'react-router-dom';
import LoginSignup from '../components/authentication/LoginSignup';
import { useUser } from '../components/profile/useUser';
import { useEffect } from 'react';
import SEO from '../ui/SEO';

function Login() {
  const navigate = useNavigate();
  const { isAuthenticated } = useUser();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/home', { replace: true });
    }
  }, [isAuthenticated, navigate]);
  return (
    <>
      <SEO
        title="Login"
        description="This is the login page of the website."
        keywords="login, page, keywords"
        author="Chirag Vijayvergiya"
      />
      <div className="lg:max-w-maxScreen relative mx-auto mt-10 min-h-screen w-full items-center justify-center overflow-hidden p-3 font-mono tracking-wider sm:mx-auto">
        <div className="relative mt-2 w-full items-center justify-center gap-x-11 overflow-hidden px-1 sm:mx-auto lg:max-w-[500px]">
          <LoginSignup />
        </div>
      </div>
    </>
  );
}

export default Login;
