import './global.scss';
import * as React from 'react';
import classes from './Header.module.scss';
import Typography from '../Typography';

type Props = {
  title: string;
}

const Header = (props: Props): React.ReactElement => {
  const { title } = props;

  return (
    <div className={classes.root}>
      <Typography variant={'heading'}>
        {title}
      </Typography>
    </div>
  );
};

export default Header;
