import React, { Component } from 'react';
import * as firebase from 'firebase';
import RoomList from './components/RoomList';
import MessageList from './components/MessageList';
import User from './components/User';
import {Navbar, Nav, NavItem, Grid, Row, Col} from 'react-bootstrap';
import './App.css';

var config = {
    apiKey: "AIzaSyAICwODjMaxn8gJQAP6iafA6uDGburODX0",
    authDomain: "bloc-chat-react-ece58.firebaseapp.com",
    databaseURL: "https://bloc-chat-react-ece58.firebaseio.com",
    projectId: "bloc-chat-react-ece58",
    storageBucket: "bloc-chat-react-ece58.appspot.com",
    messagingSenderId: "46892651318"
  };

  firebase.initializeApp(config);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeRoom: "",
      user: ""
    };

    this.setActiveRoom = this.setActiveRoom.bind(this);
    this.setUser = this.setUser.bind(this);
    }

    setActiveRoom(room) {
      console.log(room)
      this.setState({activeRoom: room});
  }

    setUser(user) {
      console.log(user);
      this.setState({user: user});
    }

  render() {
    return (
      <div>
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>Bloc Chat</Navbar.Brand>
            </Navbar.Header>
            <Nav pullRight>
            <NavItem>
            <User firebase={firebase} user={this.state.user} setUser={this.setUser}/>
          </NavItem>
        </Nav>
      </Navbar>

      <Grid>
       <Row className="show-grid">
          <Col xs={6} md={4}>
            <RoomList firebase={firebase} activeRoom={this.state.activeRoom} setActiveRoom={this.setActiveRoom} user={this.state.user}/>
              </Col>
            <Col xs={12} md={8}>
            <MessageList firebase={firebase} activeRoom={this.state.activeRoom} setActiveRoom={this.setActiveRoom} user={this.state.user}/>
          </Col>
        </Row>

        <Row>
          <Col xs={12} md={12}>Copyright 2018 Laura Meehan</Col>
        </Row>
      </Grid>

      </div>
    );
  }
}


export default App;
