import LoginSignup from '../components/authentication/LoginSignup';

function Login() {
  return (
    <div className="lg:max-w-maxScreen relative mx-auto mt-10 min-h-screen w-full items-center justify-center overflow-hidden p-3 font-mono tracking-wider sm:mx-auto">
      <div className="relative mt-2 w-full items-center justify-center gap-x-11 overflow-hidden px-1 sm:mx-auto lg:max-w-[500px]">
        <LoginSignup />
      </div>
    </div>
  );
}

export default Login;
