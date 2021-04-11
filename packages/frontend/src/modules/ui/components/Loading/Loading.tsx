import * as React from 'react';
import classes from './Loading.module.scss';

const Loading = (): React.ReactElement => {
  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <div/>
      </div>
    </div>
  );
};

export default Loading;
