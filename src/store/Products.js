//
// Many times, a view will want to fetch data to display when it is mounted.  Usually
// this would mean doing an async backend call in componentWillMount or compomentDidMount.
// But by using lazyObservable in a store, you can simply reference the store value in
// a view (or in multiple views), and the first time such a view is mounted, the data
// will be fetched!
//
// https://github.com/mobxjs/mobx-utils
//
import { computed, action, extendObservable } from 'mobx';
import { lazyObservable } from 'mobx-utils';
import { sortBy } from 'lodash';
import { postJSON } from '../lib/api';

// /test/success just returns what it is given, so give it a list
const fakeList = [
  { id: 1, name: "apples", count: 10 },
  { id: 2, name: "oranges", count: 7 },
  { id: 3, name: "bannanas", count: 12 },
  { id: 4, name: "strawberries", count: 14 },
];

class Products {

  constructor( rootStore ) {
    this.root = rootStore;
    this.list = lazyObservable( sink => {
      this.fetching = true;
      postJSON( '/test/success', fakeList ).then( (list) => {
	setTimeout( () => {
	  this.fetching = false;
	  sink( list );
	}, 1000 );
      });
    });
    extendObservable( this, {
      fetching: false
    });
  }

  @action setFetching( v ) {
    this.fetching = v;
  }
  
  @computed get sorted() {
    return sortBy( this.list.current(), 'name' );
  }

  @action refresh() {
    this.list.refresh();
  }
  
}

export default Products;

