import './global.scss';
import * as React from 'react';
import { Props as SidebarButtonProps } from './SidebarButton';
import { useLocation } from 'react-router';
import classes from './Sidebar.module.scss';
import Logo from '../Logo';

type Props = {
  children: React.ReactElement | React.ReactElement[];
}

const Sidebar = (props: Props): React.ReactElement => {
  const { children } = props;
  const location = useLocation();
  const pathname = location.pathname;

  return (
    <div className={classes.root}>
      <div className={classes.logoContainer}>
        <Logo className={classes.logo}/>
      </div>
      {React.Children.map(children, c => {
        return React.cloneElement<SidebarButtonProps>(c, {
          active: pathname === c.props.path,
        });
      })}
    </div>
  );
};

export default Sidebar;
