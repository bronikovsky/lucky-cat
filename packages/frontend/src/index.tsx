import './app.scss';
import 'dayjs/locale/pl';
import * as React from 'react';
import { Provider } from 'react-redux';
import dayjs from 'dayjs';
import ReactDOM from 'react-dom';
import relativeTime from 'dayjs/plugin/relativeTime';
import store from './store';

dayjs.locale('pl');
dayjs.extend(relativeTime);

const App = React.lazy(async () => import('./App'));

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <React.Suspense fallback={null}>
        <App/>
      </React.Suspense>
    </Provider>
  </React.StrictMode>,
  document.getElementById('app'),
);
