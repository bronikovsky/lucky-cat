import * as React from 'react';
import { ConnectedRouter } from 'connected-react-router';
import { Dashboard } from './modules/dashboard/ index';
import { history } from './store';
import { Layout, ScrollProvider, ThemeProvider } from './modules/ui';
import { Redirect, Route, Switch } from 'react-router';

const App = (): React.ReactElement => {
  return (
    <ThemeProvider>
      <ScrollProvider>
        <Layout>
          <ConnectedRouter history={history}>
            <Switch>
              <Route path={'/'} component={Dashboard}/>
              <Redirect to={'/'}/>
            </Switch>
          </ConnectedRouter>
        </Layout>
      </ScrollProvider>
    </ThemeProvider>
  );
};

export default App;

