import React from 'react';
import {observer} from "mobx-react";
import { observable } from 'mobx';
import { routes } from '../../router';

@observer(["store"])
class Login extends React.Component {
  @observable username = "";
  @observable password = "";
  @observable message = "Login with 'user' and '1234'"

  render() {
    return (
      <div>
        <h1>Please login</h1>
        <h2>{this.message}</h2>
        <br/>Username
        <br/><input value={this.username} onChange={e => this.username = e.target.value} />
        <br/>Password
        <br/><input value={this.password} onChange={e => this.password = e.target.value} />
        <br/><button onClick={this.onLogin}>Login</button>
      </div>
    )
  }

  onLogin = () => {
    this.message = "Verifying credentials..."
    this.props.store.ux.login(this.username, this.password, (err) => {
      if ( err ) {
	this.message = err.message;
      }
      else {
        this.message = "Login accepted"
	this.props.store.router.returnTo( this.props.store, { view: routes.home } );
      }
    });
  }
}

export default Login;
