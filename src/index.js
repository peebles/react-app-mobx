import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'mobx-react';
import store from './store';
import App from './containers/app';
import registerServiceWorker from './registerServiceWorker';
import {enableLogging} from 'mobx-logger';
import persistentState from './lib/PersistentState';

import { start } from './router';

// Global CSS
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';

import './index.css';

enableLogging();

const target = document.querySelector('#root');

// Initialize the store
//
// You can obtain a hydrated state somehow and pass that to initialize the store.
// In this case I am using the PersistentState object to get state from localStorage.
// This example app store the authenticated user in persistentState upon login and
// removes it on logout.  In his way you can do a browser reload and still have
// an authenticated user ... instead of bouncing to the login page every time you
// do a reload.
//
let state = persistentState.getState();
const theStore = new store( state );

// Initialize the router
start( theStore );

// Use the mobx-react Provider to provide the
// store if injected into a component.
render(
  <Provider store={ theStore }>
    <App />
  </Provider>,
  target
);
registerServiceWorker();

