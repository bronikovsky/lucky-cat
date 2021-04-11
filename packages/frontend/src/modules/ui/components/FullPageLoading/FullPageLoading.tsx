import * as React from 'react';
import classes from './FullPageLoading.module.scss';
import classnames from 'classnames';

type Props = {
  className?: string;
  pending: boolean;
}

const FullPageLoading = (props: Props): React.ReactElement | null => {
  const { pending, className } = props;

  return pending ? <div className={classnames(classes.root, className)}/> : null;
};

export default FullPageLoading;
