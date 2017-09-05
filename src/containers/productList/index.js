import React from 'react';
import { observer } from 'mobx-react';

const ProductList = observer(({ products }) => {
  return(
    <div>
      { products.list.current() === undefined || products.fetching === true
      ? <div>Loading...</div>
      : <ul>
      { products.sorted.map( product => <li key={product.id}>{product.name}</li> ) }
      </ul>
      }
    </div>
  );
})

export default ProductList;
