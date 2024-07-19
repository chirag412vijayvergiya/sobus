import Logo from '../Logo';
import HeaderAll from './HeaderAll';
import LoginSignup from './LoginSignup';
// import { useAuth } from '../../Context/Authcontext';

function MainHeader() {
  // const { isLoggedIn } = useAuth();

  return (
    <div className="fixed inset-x-0 top-0 z-[1000] flex min-h-[5.7rem] items-center justify-between border-solid bg-gray-50 dark:bg-gray-900 md:min-h-[4.5rem]">
      <Logo type="header" />
      <HeaderAll />
      <LoginSignup />
    </div>
  );
}

export default MainHeader;
