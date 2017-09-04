import Counter from './Counter';
import UX from './UX';
import { RouterStore } from 'mobx-router';

// An array of products, with a lazyObservable declaration
// so they are not fetched until first "used", and then fetched
// from the server.
import Products from './Products';

class RootStore {
  constructor() {
    this.products = new Products( this );
    this.counter = new Counter( this );
    this.ux = new UX( this );
    this.router = new RouterStore();
  }
}

export default RootStore;
