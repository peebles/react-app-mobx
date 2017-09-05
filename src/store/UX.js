import { extendObservable, action, computed } from 'mobx';
import Alert from 'react-s-alert';
import AlertStore from './AlertStore';
import { postJSON } from '../lib/api';
import persistentState from '../lib/PersistentState';
import { routes } from '../router';

const initialState = {
  user: null,
};

class UX {

  constructor( rootStore, state ) {
    this.root = rootStore;
    this.alert = new AlertStore( rootStore );
    extendObservable( this, initialState, state );
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
      //
      // Remember this user, so page reloads don't always bouce to the login page
      //
      persistentState.updateItem( 'ux.user', user );
      cb();
    }).catch( (err) => {
      cb( err );
    });
  }
  
  @action logout() {
    postJSON( '/test/logout', {} ).then( () => {
      this.user = null;
      //
      // Make sure to nuke it in persistent storage
      //
      persistentState.removeItem( 'ux.user' );

      // To to the login screen
      this.root.router.goTo( routes.login, this.root );
      
    }).catch( (err) => {
      this.alert.show( 'Error', err.message );
    });
  }
  
  @computed get isAuthenticated() {
    return this.user !== null;
  }

}

export default UX;

