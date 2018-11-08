import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList';
import MessageList from './components/MessageList';
import SplitPane from './components/SplitPane';

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
    this.state = {activeRoom: ""};

    this.setActiveRoom = this.setActiveRoom.bind(this);
    }

    setActiveRoom(room) {
      console.log(room);
      this.setState({activeRoom: room});
  }

  render() {
    return (
      <div className="App">
      <h1>Bloc Chat</h1>
      <RoomList firebase={firebase} activeRoom={this.state.activeRoom} setActiveRoom={this.setActiveRoom}/>
      <MessageList firebase={firebase} activeRoom={this.state.activeRoom} setActiveRoom={this.setActiveRoom}/>
      <SplitPane left={<RoomList/>} right={<MessageList/>}/>
      </div>
    );
  }
}

export default App;
