import * as React from 'react';
import { useTheme, useThemeToggle } from '../../contexts/ThemeContext';
import Button from '../../components/Button';

/**
 * Kind of a polyfill for storybook for theme support. This
 * should probably be an addon - maybe TODO
 */
const StorybookThemeToggle = () => {
  const theme = useTheme();
  const toggle = useThemeToggle();
  const oppositeTheme = theme === 'dark' ? 'Light' : 'Dark';

  return (
    <Button onClick={toggle} style={{ position: 'fixed', bottom: '16px', right: '16px' }}>
      {oppositeTheme}
    </Button>
  );
};

export default StorybookThemeToggle;
