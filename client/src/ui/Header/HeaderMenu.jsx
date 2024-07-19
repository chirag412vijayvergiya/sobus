import ButtonIcon from '../DarkModeIcon';
import DarkModeToggle from '../DarkModeToggle';
import UserAvatar from './UserAvatar';
import { FiLogOut } from 'react-icons/fi';

function HeaderMenu() {
  return (
    <div>
      <ul className="flex h-[45px] list-none items-center">
        <li className="mr-3">
          <DarkModeToggle />
        </li>
        <li className="mr-11">
          <UserAvatar />
        </li>
        <li className="mx-2">
          <ButtonIcon>
            <FiLogOut className="h-[1.3rem] w-[1.3rem] stroke-brand-600" />
          </ButtonIcon>
        </li>
      </ul>
    </div>
  );
}

export default HeaderMenu;
