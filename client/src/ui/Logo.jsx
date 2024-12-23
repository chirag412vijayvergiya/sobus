import { useDarkMode } from '../Context/DarkModeContext';
import { Link } from 'react-router-dom';

function Logo({ type }) {
  const { isDarkMode } = useDarkMode();
  const styles = {
    header: {
      img: 'h-[50px]',
      img2: 'h-[70px] pl-1',
      src: isDarkMode ? '/sobusdark.png' : '/sobuslight.png',
      src2: isDarkMode ? '/nmimsdark.png' : '/nmimslight.png',
    },
    footer: {
      img: 'h-[70px]',
      src: isDarkMode ? '/nmimslight.png' : '/nmimslight.png',
    },
  };

  return (
    <Link to="/" className="flex items-center justify-center">
      <img
        src={styles[type].src2}
        alt="sobus-Logo"
        className={styles[type].img2}
      />
      <img
        src={styles[type].src}
        alt="sobus-Logo"
        className={styles[type].img}
      />
    </Link>
  );
}

export default Logo;
