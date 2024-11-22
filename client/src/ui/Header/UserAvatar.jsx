import { IoIosArrowDown } from 'react-icons/io';
import { HiArrowRightOnRectangle } from 'react-icons/hi2';
import { FaUser } from 'react-icons/fa6';
import Menus from '../Menus';
import { useNavigate } from 'react-router-dom';
import { useLogout } from '../../components/authentication/useLogout';

function UserAvatar({ name, photo }) {
  const { isPending, logout } = useLogout();
  const navigate = useNavigate();
  function handleNavigation(route) {
    console.log(route);
    navigate(route);
  }
  return (
    <div className="font-rubik items-center gap-x-4 lg:flex">
      <Menus>
        <div className="relative mr-4 flex items-center gap-x-2">
          <img
            src={photo}
            loading="lazy"
            width="40"
            height="40"
            alt="user"
            className="h-10 w-10 rounded-full border border-gray-200 bg-gray-100 object-cover"
          />
          <Menus.Toggle
            id="profile"
            icon={IoIosArrowDown}
            className="absolute bottom-0 right-0 translate-x-3/4 translate-y-1/4 transform"
          />
        </div>

        <Menus.List
          id="profile"
          listClass="dark:bg-slate-800 dark:text-grey-300"
          positionX={19}
          positionY={8}
        >
          <Menus.Button
            icon={<FaUser />}
            onClick={() => handleNavigation('/account')}
          >
            {name}
          </Menus.Button>
          <Menus.Button
            icon={
              <HiArrowRightOnRectangle className="h-[1.7rem] w-[1.7rem] stroke-1 text-red-500" />
            }
            onClick={() => {
              if (isPending) return;
              logout();
            }}
            disabled={isPending}
          >
            {isPending ? 'Logging out...' : 'Logout'}
          </Menus.Button>
        </Menus.List>
      </Menus>
    </div>
  );
}

export default UserAvatar;
