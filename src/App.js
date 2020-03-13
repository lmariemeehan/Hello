import React, { Component } from 'react';
import * as firebase from 'firebase';
import RoomList from './components/RoomList';
import MessageList from './components/MessageList';
import User from './components/User';
import 'bootswatch/dist/flatly/bootstrap.min.css';
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
      <div className="wrapper d-flex align-items-stretch">
        <nav className="col-2 text-center bg-light sidebar">
          <User firebase={firebase}
                user={this.state.user}
                setUser={this.setUser} />
            <RoomList firebase={firebase}
                    activeRoom={this.state.activeRoom} setActiveRoom={this.setActiveRoom}
                    user={this.state.user} />
        </nav>
        <div className="col main">
            <header className="app-name text-primary">Hello... <span className="far fa-comment-dots"></span></header>
            <MessageList firebase={firebase}
                          activeRoom={this.state.activeRoom} setActiveRoom={this.setActiveRoom}
                          user={this.state.user} />
        </div>
      </div>
    );
  }
}


export default App;
