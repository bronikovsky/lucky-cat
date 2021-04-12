import * as React from 'react';
import { Link } from 'react-router-dom';
import Button, { Props as ButtonProps } from '../Button';

export type Props = Pick<ButtonProps, 'children' | 'StartIcon'> & {
  path: string;
  active?: boolean;
}

const SidebarButton = (props: Props): React.ReactElement => {
  const { active, path, children, ...buttonProps } = props;
  const color = active ? '--primary': undefined;
  const background = 'hsla(var(--primary-hsl), 0.05)';

  return (
    <Link to={path}>
      <Button
        color={color}
        background={background}
        hoverBackground={background}
        fullWidth
        justify={'left'}
        {...buttonProps}
      >
        {children}
      </Button>
    </Link>
  );
};

export default SidebarButton;
