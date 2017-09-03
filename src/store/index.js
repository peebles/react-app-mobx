import Counter from './Counter';
import UX from './UX';

class RootStore {
  constructor() {
    this.counter = new Counter( this );
    this.ux = new UX( this );
  }
}

export default RootStore;
