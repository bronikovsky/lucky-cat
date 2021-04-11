import * as ls from 'local-storage';
import * as React from 'react';
import { Theme } from '../types';

function detectUserPreference(): Theme {
  const savedPreference = ls.get<Theme | undefined>('theme');
  const prefersDarkTheme = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

  return savedPreference || (prefersDarkTheme ? 'dark' : 'light');
}

type Context = {
  theme: Theme,
  setTheme: (value: Theme | ((theme: Theme) => Theme)) => void
};

const ThemeContext = React.createContext<Context>({
  theme: detectUserPreference(),
  setTheme: () => {},
});

type Props = {
  children: React.ReactNode;
}

export const ThemeProvider = (props: Props) => {
  const { children } = props;
  const [theme, setTheme]= React.useState<Theme>(detectUserPreference());
  const value = { theme, setTheme };

  React.useLayoutEffect(() => {
    const root = document.body;
    const className = `Examine-${theme}`;

    root.classList.add(className);
    root.classList.remove(`Examine-${theme === 'dark' ? 'light' : 'dark'}`);
  }, [theme]);

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export function useTheme() {
  const { theme } = React.useContext(ThemeContext);

  return theme;
}

export function useThemeToggle(): (() => void) {
  const { theme, setTheme } = React.useContext(ThemeContext);

  return React.useCallback(() => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';

    setTheme(nextTheme);
  }, [setTheme, theme]);
}

export default ThemeContext;
