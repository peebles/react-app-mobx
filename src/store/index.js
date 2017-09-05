import Counter from './Counter';
import UX from './UX';
import { RouterStore } from 'mobx-router';

// An array of products, with a lazyObservable declaration
// so they are not fetched until first "used", and then fetched
// from the server.
import Products from './Products';

class RootStore {
  constructor( state ) {
    this.products = new Products( this, state.products || {} );
    this.counter = new Counter( this, state.counter || {} );
    this.ux = new UX( this, state.ux || {} );
    this.router = new RouterStore();
  }
}

export default RootStore;
