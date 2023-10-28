'use client';

import { createContext, useEffect, useState } from 'react';

const ThemeContext = createContext({
  theme: 'light', // Default theme
  handleThemeToggle: () => {}
});

const restoreLocalStorage = () => {
  if (typeof window !== 'undefined') {
    const value = localStorage.getItem('theme');
    return value || 'light';
  }
  return 'light';
};

const ThemeContextProvider = ({
  children
}: {
  children: React.ReactNode;
}) => {
  const [theme, setTheme] = useState(() => restoreLocalStorage());

  const handleThemeToggle = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  useEffect(() => {
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, handleThemeToggle }}>
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeContextProvider, ThemeContext };
