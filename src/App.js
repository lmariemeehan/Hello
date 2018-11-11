import React, { Component } from 'react';
import * as firebase from 'firebase';
import RoomList from './components/RoomList';
import MessageList from './components/MessageList';
import User from './components/User';
//import './App.css';

var config = {
    apiKey: "AIzaSyAICwODjMaxn8gJQAP6iafA6uDGburODX0",
    authDomain: "bloc-chat-react-ece58.firebaseapp.com",
    databaseURL: "https://bloc-chat-react-ece58.firebaseio.com",
    projectId: "bloc-chat-react-ece58",
    storageBucket: "bloc-chat-react-ece58.appspot.com",
    messagingSenderId: "46892651318"
  };

  const app = firebase.initializeApp(config);

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
      console.log(room);
      this.setState({activeRoom: room});
  }
    setUser(user) {
      console.log(user);
      this.setState({ user: user});
    }

  render() {
    return (
      <div>
      <header>Bloc Chat</header>
      <div className="userButtons">
        <User firebase={firebase} user={this.state.user} setUser={this.setUser}/>
      </div>
      <div className="row">
      <div className="column1">
        <RoomList firebase={firebase} activeRoom={this.state.activeRoom} setActiveRoom={this.setActiveRoom}/>
      </div>
      <div className="column2">
        <MessageList firebase={firebase} activeRoom={this.state.activeRoom} setActiveRoom={this.setActiveRoom}/>
      </div>
      </div>


      <footer>
        <p>Laura Meehan</p>
      </footer>
      </div>
    );
  }
}

export default App;
