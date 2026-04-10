'use client';

import { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'space' | 'retro';

interface ThemeContextValue {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: 'space',
  toggleTheme: () => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('space');

  useEffect(() => {
    const saved = localStorage.getItem('portfolio-theme') as Theme | null;
    if (saved === 'retro') setTheme('retro');
  }, []);

  const toggleTheme = () => {
    setTheme(prev => {
      const next = prev === 'space' ? 'retro' : 'space';
      localStorage.setItem('portfolio-theme', next);
      return next;
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
