import { Link } from 'react-router-dom';
import Button from '../Button';
import HeaderMobile from './HeaderMobile';
import UserAvatar from './UserAvatar';
import DefaultSpinner from '../DefaultSpinner';
import DarkModeToggle from '../DarkModeToggle';
import { useUser } from '../../components/profile/useUser';

function LoginSignup() {
  const { user, isPending } = useUser();
  // const isPending = false;
  // const user = {
  //   data: {
  //     data: {
  //       name: 'John Doe',
  //       photo: 'https://i.pravatar.cc/48?u=499476',
  //     },
  //   },
  // };
  // if (isPending) <DefaultSpinner />;

  return (
    <div>
      <ul className="mr-3 flex h-[45px] list-none items-center dark:text-white">
        <li className="mx-2">
          <DarkModeToggle />
        </li>
        {user ? (
          <li className="mr-2">
            <UserAvatar
              name={user.data.data.name}
              photo={user.data.data.photo}
            />
          </li>
        ) : !isPending ? (
          <li className="mx-2 hidden sm:block">
            <Link to="/login">
              <Button type="primary">Login</Button>
            </Link>
          </li>
        ) : (
          <DefaultSpinner />
        )}

        <li className="mx-2 md:hidden">
          <HeaderMobile />
        </li>
      </ul>
    </div>
  );
}

export default LoginSignup;
