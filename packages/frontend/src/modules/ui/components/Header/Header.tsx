import * as React from 'react';
import classes from './Header.module.scss';
import Typography from '../Typography';

type Props = {
}

const Header = (props: Props): React.ReactElement => {
  return (
    <div>
      <Typography variant={'heading'}>
        Overview
      </Typography>
    </div>
  );
};

export default Header;
