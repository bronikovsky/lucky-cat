import * as React from 'react';
import classes from './Layout.module.scss';
import Header from '../Header';
import Sidebar from '../Sidebar';

type Props = {
  children: React.ReactNode;
}

const Layout = (props: Props): React.ReactElement => {
  const { children } = props;

  return (
    <div className={classes.root}>
      <Sidebar/>
      <Header/>
      <main>
        {children}
      </main>
    </div>
  );
};

export default Layout;
