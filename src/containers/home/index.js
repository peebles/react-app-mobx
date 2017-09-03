import React from 'react';
import {observer} from "mobx-react";
import { observable } from 'mobx';
import { postJSON } from '../../lib/api';

// How to inject the store into a statefull component

@observer(["store"])
class Home extends React.Component {

  @observable fetchedData = null;
  @observable fetching = false;

  testApi = ( ep, data ) => {
    let { ux } = this.props.store;
    this.fetching = true;
    postJSON( ep, data ).then( (responseData) => {
      this.fetching = false;
      this.fetchedData = responseData;
      ux.alert( 'Success', JSON.stringify( responseData, null, 2 ) );
    }).catch( (err) => {
      this.fetching = false;
      ux.alert( 'Error', err.message );
    });
  }

  render() {
    let { counter, ux } = this.props.store;
    return (
      <div>
	<h1>Home</h1>
	<p>Count: {counter.count}</p>
	
	<p>
	  <button className="btn" onClick={() => counter.increment()} disabled={counter.isIncrementing}>Increment</button>
	  <button className="btn" onClick={() => counter.incrementAsync()} disabled={counter.isIncrementing}>Increment Async</button>
	</p>
	
	<p>
	  <button className="btn" onClick={() => counter.decrement()} disabled={counter.isDecrementing}>Decrementing</button>
	  <button className="btn" onClick={() => counter.decrementAsync()} disabled={counter.isDecrementing}>Decrement Async</button>
	</p>

	<div>
          <button className="btn" onClick={ () => ux.alert( 'something bad happened' ) }>Global Alert</button>
          <button className="btn" onClick={ () => ux.alert('oops', 'something BIG happened', 'large' ) }>Big Global Alert</button>
	</div>

	<div>
          <button className="btn btn-primary" onClick={ () => ux.notification( 200, 'Informational' ) }>Info</button>
          <button className="btn btn-warning" onClick={ () => ux.notification( 400, 'Warning' ) }>Warning</button>
          <button className="btn btn-danger" onClick={ () => ux.notification( 500, 'Error' ) }>Error</button>
	</div>

	<div>
	  <button className="btn" disabled={this.fetching} onClick={ () => this.testApi( '/test/success', { email: 'aqpeeb@gmail.com' } ) }>Success</button>
	  <button className="btn" disabled={this.fetching} onClick={ () => this.testApi( '/test/errors', {} ) }>Error</button>
	  <button className="btn" disabled={this.fetching} onClick={ () => this.testApi( '/test/fallbacks', {} ) }>Fallback</button>
	  <button className="btn" disabled={this.fetching} onClick={ () => this.testApi( '/test/exceptions', {} ) }>Exception</button>
	</div>
	

	{ this.fetchedData ? <pre>{JSON.stringify( this.fetchedData, null, 2 )}</pre> : null }

	
      </div>
    );
  }
}

export default Home;