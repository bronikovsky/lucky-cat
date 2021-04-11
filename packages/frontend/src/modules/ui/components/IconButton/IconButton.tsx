import * as React from 'react';
import classes from './IconButton.module.scss';
import classnames from 'classnames';

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: NonNullable<React.ReactNode>;
}

const IconButton = React.forwardRef((props: Props, ref: React.Ref<HTMLButtonElement>): React.ReactElement => {
  const { children, className, ...buttonProps } = props;

  return (
    <button type={'button'} className={classnames(classes.root, className)} {...buttonProps} ref={ref}>
      {children}
    </button>
  );
});

export default IconButton;
