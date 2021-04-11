import './global.scss';
import * as React from 'react';
import { composeHandlers } from '../../utils';
import { useFocus } from '../../hooks';
import classes from './TextField.module.scss';
import classnames from 'classnames';

export type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  StartIcon?: React.ComponentType;
  focused?: boolean;
  hint?: string;
  error?: string | null;
}

const TextField = (props: Props): React.ReactElement => {
  const {
    StartIcon = null,
    className,
    hint,
    error,
    focused: _focused,
    onFocus: _onFocus,
    onBlur: _onBlur,
    ...inputProps
  } = props;
  const [focused, handlers] = useFocus();

  /* eslint-disable react-hooks/exhaustive-deps */
  const onFocus = React.useCallback(composeHandlers(_onFocus, handlers.onFocus), []);
  const onBlur = React.useCallback(composeHandlers(_onBlur, handlers.onBlur), []);
  /* eslint-enable react-hooks/exhaustive-deps */

  const fieldClass = classnames(
    classes.field,
    className,
    {
      [classes.focused]: focused || props.focused,
      [classes.empty]: !props.value,
      [classes.startIcon]: StartIcon,
      [classes.error]: error,
    },
  );

  const finalInputProps = { ...inputProps, onFocus, onBlur };

  return (
    <div className={classes.root}>
      <div className={fieldClass}>
        {StartIcon && <StartIcon/>}
        <input {...finalInputProps}/>
      </div>
      {hint && (
        <div className={classes.hint}>
          {hint}
        </div>
      )}
      {error && (
        <div className={classes.error}>
          {error}
        </div>
      )}
    </div>
  );
};

export default TextField;
