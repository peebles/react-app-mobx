import React from 'react';
import { observer } from 'mobx-react';
import { Segment, List } from 'semantic-ui-react';

const ProductList = observer(({ products }) => {
  return(
    <Segment basic loading={products.list.current() === undefined || products.fetching === true}>
    { products.list.current() === undefined || products.fetching === true
      ? null
      : <List>
      { products.sorted.map( product => <List.Item key={product.id}>{product.name}</List.Item> ) }
      </List>
      }
    </Segment>
  );
})

export default ProductList;
