//
// Simple class to save and restore mobx state from localStorage
//
// Can use this mechanism to store the logged in user so that browser
// reloads do not have to go back to the server to get the authenticated user.
//
import { has, get, set, unset } from 'lodash';

class PersistentState {

  // return the entire state object as JSON
  getState() {
    let state = window.localStorage.getItem( '__state' );
    if ( state === null ) return {};
    try {
      return JSON.parse( state );
    } catch( err ) {
      console.error( err );
      return {};
    }
  }

  // Get data at a path
  //
  // data = getItem( 'ux.user' );
  //
  getItem( path ) {
    let state = this.getState();
    return get( state, path );
  }

  // Set/Modify data at a path
  //
  // updateItem( 'ux.user', { name: "Andrew" } );
  //
  updateItem( path, data ) {
    let state = this.getState();
    set( state, path, data );
    window.localStorage.setItem( '__state', JSON.stringify( state ) );
  }

  // Remove an item at a path
  //
  // removeItem( 'ux.user' );
  //
  removeItem( path ) {
    let state = this.getState();
    if ( ! has( state, path ) ) return;
    unset( state, path );
    window.localStorage.setItem( '__state', JSON.stringify( state ) );
  }

}

const persistentState = new PersistentState();
export default persistentState;
