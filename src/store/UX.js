import { extendObservable, action } from 'mobx';
import Alert from 'react-s-alert';

const initialState = {
  modalTitle: '',
  modalMessage: '',
  modalSize: null,
  modalOpen: false,
};

class UX {

  constructor( rootStore ) {
    this.root = rootStore;
    extendObservable( this, initialState );
  }

  @action alert( title, message, size ) {
    if ( ! message ) {
      message = title;
      title = 'Alert';
    }
    this.modalTitle = title;
    this.modalMessage = message;
    this.modalSize = size;
    this.modalOpen = true;
  }

  @action alertClose() {
    this.modalOpen = false;
  }

  @action notification( code, message ) {
    let severity;
    switch( code ) {
      case 500:
        severity = 'error';
        break;
      case 200:
        severity =  'info';
        break;
      default:
        severity = 'warning';
    }
    Alert[ severity ]( message );
  }
}

export default UX;

