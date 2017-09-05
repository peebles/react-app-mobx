import React from 'react';
import { observer } from 'mobx-react';

import './App.css';
import logo from './logo.svg';

import { Link, MobxRouter } from 'mobx-router';
import { routes } from '../../router';

import AlertModal from '../alert-modal';
import Alert from 'react-s-alert';

import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/slide.css';

const App = observer(["store"],({store}) => (
  <div className="App">

    <div className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <h2>Welcome to React</h2>
      <div>{store.ux.user ? store.ux.user.name : 'anonymous'}</div>
    </div>
    <div>
      <Link view={routes.about} store={store}>About</Link>
      &nbsp;
      { store.ux.user ? <Link view={routes.home} store={store}>Home</Link> : <Link view={routes.login} store={store}>Login</Link> }
      &nbsp;
      { store.ux.user ? <a href="javascript:;" onClick={() => store.ux.logout()}>Logout</a> : null }
    </div>
    <MobxRouter />
    <Alert stack={true} effect="slide" offset={160} />
    <AlertModal />
  </div>
));

export default App;
