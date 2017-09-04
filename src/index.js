import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'mobx-react';
import store from './store';
import App from './containers/app';
import registerServiceWorker from './registerServiceWorker';
import {enableLogging} from 'mobx-logger';

import { start } from './router';

// Global CSS
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';

import './index.css';

enableLogging();

const target = document.querySelector('#root');

// Use the mobx-react Provider to provide the
// store if injected into a component.

const theStore = new store();
start( theStore );

render(
  <Provider store={ theStore }>
    <App />
  </Provider>,
  target
);
registerServiceWorker();


// Router?
/*
ReactDOM.render(
  <Provider store={ new store() }>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <Route path="/" component={SomeComponent} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app')
);
*/
