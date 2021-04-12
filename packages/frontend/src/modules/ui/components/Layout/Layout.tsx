import * as React from 'react';
import classes from './Layout.module.scss';
import Header from '../Header';
import Sidebar from '../Sidebar';

type Props = {
  children: React.ReactNode;
  title: string;
  SidebarChildren: React.ReactElement | React.ReactElement[];
}

const Layout = (props: Props): React.ReactElement => {
  const { children, title, SidebarChildren } = props;

  return (
    <div className={classes.root}>
      <Sidebar>
        {SidebarChildren}
      </Sidebar>
      <Header title={title}/>
      <main>
        {children}
      </main>
    </div>
  );
};

export default Layout;
