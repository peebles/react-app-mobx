// A Global Alert
import { extendObservable, action } from 'mobx';

const initialState = {
  title: '',
  message: '',
  size: null,
  open: false,
  basic: false,
};

class AlertStore {

  constructor( rootStore ) {
    this.root = rootStore;
    extendObservable( this, initialState );
  }

  @action show( title, message, size, basic ) {
    if ( ! message ) {
      message = title;
      title = 'Alert';
    }
    this.title = title;
    this.message = message;
    this.size = size;
    this.basic = basic === undefined ? false : basic;
    this.open = true;
  }

  @action close() {
    this.open = false;
  }

}

export default AlertStore;

