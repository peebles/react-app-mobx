import React from 'react';
import Home from '../home';
//import About from '../about';
import './App.css';
import logo from './logo.svg';

import AlertModal from '../alert-modal';
import Alert from 'react-s-alert';

import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/slide.css';

const App = () => (
  <div className="App">

    <div className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <h2>Welcome to React</h2>
    </div>
    <Home />
    <Alert stack={true} effect="slide" offset={160} />
    <AlertModal />
  </div>
);

export default App;
