import { useState } from 'react';
import { MdEmail } from 'react-icons/md';
import { RiLockPasswordFill } from 'react-icons/ri';
import Button from '../../ui/Button';
import { useLogin } from './useLogin';
import { Spinner } from '@material-tailwind/react';

function Loginuser() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, isPending } = useLogin();
  function handleSubmit(e) {
    e.preventDefault();
    if (!email || !password) return;
    // console.log(email, password);
    login(
      { email, password },
      {
        onSettled: () => {
          setEmail('');
          setPassword('');
        },
      },
    );
  }
  return (
    <form className="flex w-full flex-col gap-y-3" onSubmit={handleSubmit}>
      <div className="grid items-center gap-1.5">
        <label
          className="p-small group flex items-center gap-3 font-mono text-sm font-medium leading-none tracking-wider text-grey-300 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          htmlFor="InputEmailP"
        >
          <MdEmail className="h-5 w-5 fill-grey-400 group-hover:fill-indigo-500" />
          Email Address
        </label>
        <div className="items-center font-mono">
          <input
            className="ring-offset-background focus-visible:ring-ring h-10 w-full rounded-md border border-grey-100 bg-grey-50 p-3 pl-10 text-sm tracking-wider text-grey-800 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-grey-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-grey-700 dark:bg-grey-800 dark:text-grey-50"
            placeholder="Enter your email address "
            id="InputEmailP"
            type="email"
            autoComplete="username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isPending}
          />
        </div>
      </div>
      <div className="grid items-center gap-1.5">
        <label
          className="p-small group flex items-center gap-3 font-mono text-sm font-medium leading-none tracking-wider text-grey-300 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          htmlFor="InputPasswordP"
        >
          <RiLockPasswordFill className="h-5 w-5 fill-grey-400 group-hover:fill-indigo-500" />
          Password
        </label>
        <div className="items-center font-mono">
          <input
            className="ring-offset-background focus-visible:ring-ring h-10 w-full rounded-md border border-grey-100 bg-grey-50 p-3 pl-10 text-sm tracking-wider text-grey-800 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-grey-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-grey-700 dark:bg-grey-800 dark:text-grey-50"
            placeholder="Enter your Password"
            id="InputPasswordP"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isPending}
          />
        </div>
      </div>

      <Button type="third" class="margin-left: 4px" disabled={isPending}>
        {!isPending ? (
          <span className="font-mono tracking-wider">Login</span>
        ) : (
          <Spinner />
        )}
      </Button>
    </form>
  );
}

export default Loginuser;
