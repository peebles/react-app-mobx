import React from 'react';
import {observer} from "mobx-react";
import { observable } from 'mobx';
import { routes } from '../../router';

import { Segment, Form } from 'semantic-ui-react';

import './login.css';

@observer(["store"])
class Login extends React.Component {
  @observable username = "";
  @observable password = "";
  @observable message = "Login with 'user' and '1234'"

  render() {

    let { Field, Button, Group, Input } = Form;
    
    return (
      <div>
        <h1>Please login</h1>
        <h2>{this.message}</h2>
	<Segment className="login">
	  <Form>
	    <Input label="Username" type="text" value={this.username} onChange={e => this.username = e.target.value} />
	    <Input label="Password" type="password" value={this.password} onChange={e => this.password = e.target.value} />
	    <Button type="submit" onClick={this.onLogin}>Login</Button>
	  </Form>
	</Segment>
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
