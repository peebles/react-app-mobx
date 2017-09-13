import React from 'react';
import {observer} from "mobx-react";
import { observable } from 'mobx';
import { postJSON } from '../../lib/api';
import ProductList from '../productList';
import { Container, Button, Segment } from 'semantic-ui-react';

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
      ux.alert.show( 'Success', JSON.stringify( responseData, null, 2 ) );
    }).catch( (err) => {
      this.fetching = false;
      ux.alert.show( 'Error', err.message );
    });
  }

  render() {
    let { counter, ux, router, products } = this.props.store;
    return (
      <Container fluid>
	<h1>Home</h1>
	<p>Count: {counter.count}</p>
	<Segment.Group>
	  <Segment>
	    <Button  onClick={() => counter.increment()} disabled={counter.isIncrementing}>Increment</Button>
	    <Button  onClick={() => counter.incrementAsync()} disabled={counter.isIncrementing}>Increment Async</Button>
	  </Segment>
	
	  <Segment>
	    <Button  onClick={() => counter.decrement()} disabled={counter.isDecrementing}>Decrementing</Button>
	    <Button  onClick={() => counter.decrementAsync()} disabled={counter.isDecrementing}>Decrement Async</Button>
	  </Segment>

	  <Segment>
            <Button  onClick={ () => ux.alert.show( 'something bad happened' ) }>Global Alert</Button>
            <Button  onClick={ () => ux.alert.show('oops', 'something BIG happened', 'large' ) }>Big Global Alert</Button>
            <Button  onClick={ () => ux.alert.show('oops', 'something FullScreen happened', null, true ) }>Fullscreen Global Alert</Button>
	  </Segment>

	  <Segment>
            <Button color="blue" onClick={ () => ux.notification( 200, 'Informational' ) }>Info</Button>
            <Button color="green" onClick={ () => ux.notification( 400, 'Warning' ) }>Warning</Button>
            <Button color="red" onClick={ () => ux.notification( 500, 'Error' ) }>Error</Button>
	  </Segment>

	  <Segment>
	    <Button  disabled={this.fetching} onClick={ () => this.testApi( '/test/success', { email: 'aqpeeb@gmail.com' } ) }>Success</Button>
	    <Button  disabled={this.fetching} onClick={ () => this.testApi( '/test/errors', {} ) }>Error</Button>
	    <Button  disabled={this.fetching} onClick={ () => this.testApi( '/test/fallbacks', {} ) }>Fallback</Button>
	    <Button  disabled={this.fetching} onClick={ () => this.testApi( '/test/exceptions', {} ) }>Exception</Button>
	  </Segment>
	</Segment.Group>

	{/* Here's how to get at query params
	<div>{JSON.stringify(router.queryParams)}</div>
	*/}
	
	{ this.fetchedData ? <pre>{JSON.stringify( this.fetchedData, null, 2 )}</pre> : null }

	{/* This should kick off the async fetch of the products list from the server */}
	<ProductList products={products} />

	{/* The products list won't update now unless we explicity refresh() the lazyObservable */}
	<Button primary  onClick={() => products.refresh()}>Refresh Products...</Button>
	
      </Container>
    );
  }
}

export default Home;
