import * as React from 'react';
import { ConnectedRouter } from 'connected-react-router';
import { Dashboard } from './modules/dashboard/ index';
import { history } from './store';
import { Home } from '@material-ui/icons';
import { Layout, ScrollProvider, SidebarButton, ThemeProvider } from './modules/ui';
import { R } from './modules/common';
import { Redirect, Route, Switch } from 'react-router';
import { useLocalization } from './modules/localization';

const App = (): React.ReactElement => {
  const l = useLocalization();

  const SidebarChildren = (
    <SidebarButton StartIcon={Home} path={R.ROOT}>
      {l.sidebar.home}
    </SidebarButton>
  );

  return (
    <ThemeProvider>
      <ScrollProvider>
        <ConnectedRouter history={history}>
          <Layout SidebarChildren={SidebarChildren} title={l.overview}>
            <Switch>
              <Route path={R.ROOT} component={Dashboard}/>
              <Redirect to={R.ROOT}/>
            </Switch>
          </Layout>
        </ConnectedRouter>
      </ScrollProvider>
    </ThemeProvider>
  );
};

export default App;

