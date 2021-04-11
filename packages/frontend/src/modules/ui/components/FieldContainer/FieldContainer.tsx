import * as React from 'react';
import classes from './FieldContainer.module.scss';
import classnames from 'classnames';
import Typography from '../Typography';

type Props = {
  error: string | null;
  label: string;
  labelFor: string;
  className?: string;
  hint?: string;
  focused?: boolean;

  children: NonNullable<React.ReactNode>;
}

const FieldContainer = (props: Props): React.ReactElement => {
  const { focused, error, hint, label, children, className, labelFor } = props;

  const rootClass = classnames(
    classes.root,
    className,
    {
      [classes.error]: error,
      [classes.focused]: focused,
    },
  );

  return (
    <div className={rootClass}>
      <Typography>
        <label htmlFor={labelFor}>
          {label}
        </label>
      </Typography>
      {children}
      {hint && (
        <Typography className={classes.hint} color={'text-secondary'}>
          {hint}
        </Typography>
      )}
      {error && (
        <Typography color={'error'} className={classes.error}>
          {error}
        </Typography>
      )}
    </div>
  );
};

export default FieldContainer;
