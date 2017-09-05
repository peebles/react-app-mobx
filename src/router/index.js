import React from 'react';

import { Route, startRouter } from 'mobx-router';

import Home from '../containers/home';
import About from '../containers/about';
import Login from '../containers/login';

export const routes = {
  home: new Route({
    path: '/home',
    component: <Home />,
    beforeEnter: (route, params, store, queryParams ) => {
      if ( store.ux.isAuthenticated ) return true;
      store.router.goTo( routes.login );
      return false;
    }
  }),
  about: new Route({
    path: '/about',
    component: <About />
  }),
  index: new Route({
    path: '/',
    component: <About />
  }),
  login: new Route({
    path: '/login',
    component: <Login />
  })
};

export const start = ( store ) => {
  startRouter( routes, store );
}
