import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList';
import MessageList from './components/MessageList';
import ActiveRoom from './components/ActiveRoom';

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
    this.state = {ActiveRoom: ""};

    }

    handleRoomClick(room) {
      this.setState({activeRoom: this.room.key});

  }
  render() {
    return (
      <div className="App">
      <RoomList firebase={firebase} handleRoomClick={(e) => this.handleRoomClick(e)}/>
      <MessageList firebase={firebase}/>
      <main>

      </main>
      </div>
    );
  }
}

export default App;
