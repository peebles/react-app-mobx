import { extendObservable, computed, action } from 'mobx';

const initialState = {
  count: 0,
  isIncrementing: false,
  isDecrementing: false
};

class Counter {

  constructor( rootStore ) {
    this.root = rootStore;
    extendObservable( this, initialState );
  }

  @computed get isOdd() {
    return this.count %2 === 1;
  }
  @action increment() {
    this.count += 1;
  }
  @action decrement() {
    this.count -= 1;
  }
  @action incrementAsync() {
    this.isIncrementing = true;
    setTimeout( action( "setTimeout", () => {
      this.isIncrementing = false;
      this.increment();
    }), 1000 );
  }
  @action decrementAsync() {
    this.isDecrementing = true;
    setTimeout( action( "setTimeout", () => {
      this.isDecrementing = false;
      this.decrement();
    }), 1000 );
  }
}

export default Counter;

