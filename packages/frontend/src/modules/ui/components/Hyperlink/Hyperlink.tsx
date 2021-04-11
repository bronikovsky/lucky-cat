import * as React from 'react';
import { Link, LinkProps } from 'react-router-dom';
import classes from './Hyperlink.module.scss';
import classnames from 'classnames';
import Typography from '../Typography';

type CommonProps = {
  children: NonNullable<React.ReactNode>;
}

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & CommonProps & {
  to?: string;
}

export type Props = LinkProps & CommonProps | ButtonProps

const Hyperlink = (props: Props): React.ReactElement => {
  const { children, className, ...otherProps } = props;
  const isLink = typeof props.to !== 'undefined';
  const RootComponent = isLink ? Link : 'button';
  const rootClass = classnames(classes.root, className);
  const defaultProps = isLink ? {} : { type: 'button' };
  const finalProps = { ...defaultProps, className: rootClass, ...otherProps };

  return (
    <RootComponent {...finalProps}>
      <Typography variant={'button'} color={'primary'}>
        {children}
      </Typography>
    </RootComponent>
  );
};

export default Hyperlink;
