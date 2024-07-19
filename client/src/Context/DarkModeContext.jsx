import { createContext, useContext, useEffect } from 'react';
import { useLocalStorageState } from '../hooks/useLocalStorageState';

// Define the new context
const DarkModeContext = createContext();

function DarkModeProvider({ children }) {
  const [isDarkMode, setIsDarkMode] = useLocalStorageState(
    window.matchMedia('(prefers-color-scheme:dark)').matches,
    'isDarkMode',
  );

  useEffect(
    function () {
      if (isDarkMode) {
        document.documentElement.classList.add('dark');
        // document.documentElement.classList.remove('light-mode');
      } else {
        document.documentElement.classList.remove('dark');
      }
    },
    [isDarkMode],
  );

  function toggleDarkMode() {
    // console.log(isDarkMode);
    setIsDarkMode((isDark) => !isDark);
    // console.log(isDarkMode);
  }

  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
}

// Custom Hook
function useDarkMode() {
  const context = useContext(DarkModeContext);
  // console.log(context);
  if (context === undefined)
    throw new Error('DarkModeContext was used outside of DarkModeProvider');
  return context;
}
export { DarkModeProvider, useDarkMode };
