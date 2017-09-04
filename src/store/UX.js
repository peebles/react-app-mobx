import { extendObservable, action, computed } from 'mobx';
import Alert from 'react-s-alert';
import AlertStore from './AlertStore';
import { postJSON } from '../lib/api';

const initialState = {
  user: null,
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

  @action login( username, password, cb ) {
    postJSON( '/test/login', { username, password } ).then( (user) => {
      this.user = user;
      cb();
    }).catch( (err) => {
      cb( err );
    });
  }
  
  @action logout() {
    postJSON( '/test/logout', {} ).then( () => {
      this.user = null;
    }).catch( (err) => {
      this.alert.show( 'Error', err.message );
    });
  }
  
  @computed get isAuthenticated() {
    return this.user !== null;
  }

}

export default UX;

