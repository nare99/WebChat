import React from 'react';
import SignIn from './view/signIn/signIn';
import SignUp from './view/signUp/signUp';
import Chat from './view/chat/chat';
import history from './history';

import cookie from 'react-cookies';
import jwt from 'jwt-simple';



import {
  Router,
  Switch,
  Route,
  useParams
} from "react-router-dom";

import { w3cwebsocket as W3CWebSocket } from 'websocket';
let payload = {id: 0}
let forClient = '';
let forUser2 = 0;
try {
  const access_token = cookie.load('access_token');
  payload = jwt.decode(access_token, 'adswfesgmsekrhwajgcqjathxevbQCDWTUAFWAFBWSRJKLVFWHKAR', false, 'HS256');
  forClient = new W3CWebSocket('ws://localhost:4000/messages');

} catch(e) {
  console.log('catched');
}
class App extends React.Component{
  constructor(props) {
    super(props);
    
    this.state = {
      user1: {id:payload.id},
      user2_id: history.location.pathname.substring(10,history.location.pathname.length ) || 0,
      client: forClient,
      access: '',
      sign_up: ''
    };

    this.u2IDHandler = this.u2IDHandler.bind(this);
    this.u1Handler = this.u1Handler.bind(this);

    this.clientHandler = this.clientHandler.bind(this);
    this.tokenHandler = this.tokenHandler.bind(this);
  }

  u1Handler(u1) {
    this.setState({
      user1: u1
    })
  }

  u2IDHandler(u_id) {
    this.setState({
      user2_id: u_id,
    })
  }

  signUpHandler(text) {
    this.setState({
      sign_up: text,
    })
  }


  clientHandler(newClient) {
    this.setState({
      client: newClient
    })
  }

  tokenHandler(token) {
    this.setState({
      access: token
    })
  }

  render() {
    return (
        <div className="App">
           {/* <Form></Form> */}
        {/*  <GetUser></GetUser>
          <SignOut></SignOut> */}
          <Router history={history}>
            <Switch>
              <Route exact path='/'><SignIn tokenHandler={this.tokenHandler} clientHandler={this.clientHandler} user2_id={this.state.user2_id} user1={this.state.user1} action={this.u1Handler}/></Route>
              <Route exact path='/signUp'><SignUp signUpHandler={this.signUpHandler} tokenHandler={this.tokenHandler} clientHandler={this.clientHandler} user2_id={this.state.user2_id} user1={this.state.user1} action={this.u1Handler}/></Route>
              <Route forceRefresh={true} exact path={`/messages/:id`}><Chat signUp={this.state.sign_up} token={this.state.access} client={this.state.client} user1={this.state.user1} user2_id={this.state.user2_id} action={this.u2IDHandler}/></Route>
              {/* <Route forceRefresh={true} exact path={`/messages/`}><Chat token={this.state.access} client={this.state.client} user1={this.state.user1} user2_id={this.state.user2_id} action={this.u2IDHandler}/></Route> */}
            </Switch>
          </Router>
          {/* <SideBar></SideBar>
          <Content></Content> */}
        </div>
    );
  }
}

export default App;