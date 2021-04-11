import * as React from 'react';
import { ThemeProvider } from '../../contexts';
import StorybookThemeToggle from '../StorybookThemeToggle';
import TextField, { Props } from './TextField';

interface Story<T> {
  args?: Partial<T>;
  (args: Props): React.ReactElement;
}

export const All: Story<Props> = args => (
  <ThemeProvider>
    <TextField {...args}/>
    <StorybookThemeToggle/>
  </ThemeProvider>
);

All.args = {
  placeholder: 'Email',
  hint: 'Enter your business email. This will be the primary email used for communication on our platform.',
  value: 'username@domain',
  error: 'Email is invalid',
};

export default {
  title: 'Components/TextField',
  component: TextField,
  argTypes: {
    focused: {
      table: {
        disable: true,
      },
    },
    value: {
      table: {
        disable: true,
      },
    },
    StartIcon: {
      table: {
        disable: true,
      },
    },
    error: {
      control: {
        type: 'text',
      },
    },
  },
};
