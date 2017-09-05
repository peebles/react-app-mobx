## Dynamic Classnames

See [classnames](https://github.com/JedWatson/classnames).

```javascript
  render () {
    var btnClass = classNames({
      'btn': true,
      'btn-pressed': this.state.isPressed,
      'btn-over': !this.state.isPressed && this.state.isHovered
    });

    return <button className={btnClass}>I'm a button!</button>;
  }
```

## Alerts and Notifications

```javascript
  store.ux.alert.show( 'title', 'message' );
  store.ux.notification( code (200||40x||500), 'message' );
```

## APIs

```javascript
  import { postJSON, getJSON } from '../../api';

  postJSON( endpoint, data ).then( data ).catch( err )
  getJSON( endpoint, data ).then( data ).catch( err )
```

The `err` is modeled after Error() ... it has .message.  It will also have .status which is
the status code.  It also has .statusText (the http status text) and .responseText (the message
body).  The .message is .responseText || .statusText.

See `./src/containers/home/index.js` for more extensive examples.

## Other Things to Look At

For an alternative to defining endpoints for everything, and instead making
what looks like a big javascript object available over the network, check
out [Falcor](https://netflix.github.io/falcor/starter/why-falcor.html) and
using this with [redux](https://github.com/ekosz/redux-falcor).
