import { HiOutlineMoon, HiOutlineSun } from 'react-icons/hi2';
import ButtonIcon from './DarkModeIcon';
import { useDarkMode } from '../Context/DarkModeContext';

function DarkModeToggle() {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  return (
    <ButtonIcon onClick={toggleDarkMode}>
      {isDarkMode ? (
        <HiOutlineSun className="h-[1.3rem] w-[1.3rem] stroke-brand-600" />
      ) : (
        <HiOutlineMoon className="h-[1.3rem] w-[1.3rem] stroke-brand-600" />
      )}
    </ButtonIcon>
  );
}

export default DarkModeToggle;
