import * as React from 'react';
import { KeyboardArrowLeft } from '@material-ui/icons';
import { ThemeProvider } from '../../contexts';
import Button, { Props } from './Button';
import classes from './Button.module.scss';
import StorybookThemeToggle from '../StorybookThemeToggle';

function createButtonVariants(props: Props) {
  return (
    <div className={classes.storybookContainer}>
      <Button {...props}>
        Button
      </Button>
      <Button disabled {...props}>
        Button
      </Button>
      <Button loading {...props}>
        Button
      </Button>
      <Button loading disabled {...props}>
        Button
      </Button>
    </div>
  );
}

export const All = (
  { background: bg, color: c }: { background?: string; color?: string },
) => {
  const background = bg || undefined;
  const color = c || undefined;

  return (
    <ThemeProvider>
      {createButtonVariants({})}
      {createButtonVariants({ StartIcon: KeyboardArrowLeft })}
      {createButtonVariants({ color: background })}
      {createButtonVariants({ StartIcon: KeyboardArrowLeft, color: background })}
      {createButtonVariants({ background, color })}
      {createButtonVariants({ StartIcon: KeyboardArrowLeft, background, color })}
      <StorybookThemeToggle/>
    </ThemeProvider>
  );
};

All.args = {
  background: '--primary',
  color: '--button-text-light',
};

export default {
  title: 'Components/Button',
  component: Button,
  argTypes: {
    fullWidth: {
      table: {
        disable: true,
      },
    },
    hoverEffect: {
      table: {
        disable: true,
      },
    },
    loading: {
      table: {
        disable: true,
      },
    },
    StartIcon: {
      table: {
        disable: true,
      },
    },
    background: {
      name: 'Leading color',
    },
    color: {
      name: 'Text color on leading background',
    },
  },
};

