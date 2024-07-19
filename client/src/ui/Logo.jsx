import { useDarkMode } from '../Context/DarkModeContext';
import { Link } from 'react-router-dom';

function Logo({ type }) {
  const { isDarkMode } = useDarkMode();
  const styles = {
    header: {
      img: 'h-[30px] pl-6',
      src: isDarkMode ? '/vite.svg' : '/vite.svg',
      p: 'hidden gap-1 text-2xl font-semibold uppercase md:inline',
      span: 'text-black dark:text-white',
    },
    footer: {
      img: 'h-[30px]',
      src: `${isDarkMode ? '/vite.svg' : '/vite.svg'}`,
      p: 'hidden gap-1 text-2xl font-semibold uppercase md:inline',
      span: 'text-white dark:text-black',
    },
  };

  return (
    <Link to="/" className="flex items-center justify-center gap-x-3">
      <img
        src={styles[type].src}
        alt="sobus-Logo"
        className={styles[type].img}
      />

      <p className={styles[type].p}>
        <span className={styles[type].span}>so</span>
        <span className="text-indigo-500">bus</span>
      </p>
    </Link>
  );
}

export default Logo;
