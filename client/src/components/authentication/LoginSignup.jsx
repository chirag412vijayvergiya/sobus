import { useState } from 'react';
import Modal from '../../ui/Modal';
import Forgotpasswordform from './Forgotpasswordform';
import Loginuser from './Loginuser';
import Signupuser from './Signupuser';

function LoginSignup() {
  const [isLogin, setLogin] = useState(true);

  const toggleMode = () => {
    setLogin((prevState) => !prevState);
  };

  return (
    <div className="flex max-w-lg flex-col items-start gap-5 rounded-lg border-t-[5px] border-indigo-900 bg-gradient-to-b from-slate-900 to-grey-800 px-10 py-2 shadow-md">
      <div className="mb-1 flex flex-col items-center">
        <h3 className="my-2 text-center text-2xl">Hey! 👋 Sobus Family</h3>
        <p className="max-w-2xl text-center text-sm text-grey-50">
          Accessing your Account in the Sobus. Made it Easy with One Click.
        </p>
      </div>
      <button className="mx-auto flex w-full items-center justify-center gap-2 rounded-md border border-grey-600 p-2 px-4 text-sm hover:bg-grey-800 lg:text-base">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="22"
          height="22"
          viewBox="0 0 30 30"
        >
          <path
            fill="#4285F4"
            d="M28.2 15.313a15.8 15.8 0 0 0-.25-2.813H15v5.319h7.4a6.325 6.325 0 0 1-2.744 4.15v3.45H24.1c2.6-2.394 4.1-5.919 4.1-10.106"
          ></path>
          <path
            fill="#34A853"
            d="M15 28.75c3.712 0 6.825-1.231 9.1-3.331l-4.444-3.45c-1.231.825-2.806 1.312-4.656 1.312-3.581 0-6.613-2.419-7.694-5.669H2.712v3.563C4.975 25.669 9.625 28.75 15 28.75"
          ></path>
          <path
            fill="#FBBC05"
            d="M7.306 17.613A8.266 8.266 0 0 1 6.875 15c0-.906.156-1.787.431-2.612V8.825H2.713A13.745 13.745 0 0 0 1.25 15c0 2.219.531 4.319 1.463 6.175l4.593-3.562"
          ></path>
          <path
            fill="#EA4335"
            d="M15 6.719c2.019 0 3.831.693 5.256 2.056L24.2 4.831C21.819 2.612 18.706 1.25 15 1.25c-5.375 0-10.025 3.081-12.288 7.575l4.594 3.563c1.081-3.25 4.113-5.67 7.694-5.67"
          ></path>
        </svg>
        <span
          className="font-mono tracking-wider text-grey-100"
          // onClick={login}
        >
          Continue with Google
        </span>
      </button>
      <div className="flex items-center gap-2 self-stretch">
        <span className="h-[1px] flex-1 bg-grey-300"></span>
        <p className="min-w-fit text-base text-grey-100">
          or register with email
        </p>
        <span className="h-[1px] flex-1 bg-grey-300"></span>
      </div>
      {isLogin ? <Loginuser /> : <Signupuser />}
      <button
        className="focus-visible:ring-ring mx-auto -mt-4 inline-flex h-10 items-center justify-center whitespace-nowrap rounded-md px-4 py-2 font-mono text-sm font-medium tracking-wider text-blue-400 underline-offset-4 transition-colors hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
        type="button"
        onClick={toggleMode}
      >
        {isLogin ? "Don't have an account?" : 'Already have an account?'}
      </button>
      {isLogin && (
        <Modal>
          <Modal.Open opens="forgotPassword-form">
            <button
              className="focus-visible:ring-ring mx-auto -mt-2 mr-0 inline-flex h-10 whitespace-nowrap rounded-md py-1 pl-4 font-mono text-sm font-medium tracking-wider text-red-400 underline-offset-4 transition-colors hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
              type="button"
              // onClick={toggleMode}
            >
              forgot Password?
            </button>
          </Modal.Open>
          <Modal.Window name="forgotPassword-form">
            <Forgotpasswordform patient="patient" />
          </Modal.Window>
        </Modal>
      )}
    </div>
  );
}

export default LoginSignup;
