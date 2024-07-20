import { useDarkMode } from '../Context/DarkModeContext';
import { Link } from 'react-router-dom';

function Logo({ type }) {
  const { isDarkMode } = useDarkMode();
  const styles = {
    header: {
      img: 'h-[30px] pl-6',
      src: isDarkMode ? '/vite.svg' : '/vite.svg',
      p: 'hidden gap-1 text-xl font-semibold uppercase md:inline tracking-wider',
      span: 'text-black dark:text-white',
    },
    footer: {
      img: 'h-[30px]',
      src: `${isDarkMode ? '/vite.svg' : '/vite.svg'}`,
      p: 'hidden gap-1 text-xl font-semibold uppercase md:inline',
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
      <div className="flex flex-col">
        <p className={styles[type].p}>
          <span className="text-indigo-500">s</span>
          <span className={styles[type].span}>obu</span>
          <span className="text-indigo-500">s</span>
        </p>
        <p className="hidden text-[0.5rem] font-semibold uppercase tracking-wider md:inline">
          <span className={`${styles[type].span} font-mono`}>center</span>{' '}
          <span className="text-indigo-500 dark:text-indigo-600">of</span>{' '}
          <span className={styles[type].span}>excellence</span>
        </p>
      </div>
    </Link>
  );
}

export default Logo;
