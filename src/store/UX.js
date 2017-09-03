import { extendObservable, action } from 'mobx';
import Alert from 'react-s-alert';
import AlertStore from './AlertStore';

const initialState = {
};

class UX {

  constructor( rootStore ) {
    this.root = rootStore;
    this.alert = new AlertStore( rootStore );
    extendObservable( this, initialState );
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

