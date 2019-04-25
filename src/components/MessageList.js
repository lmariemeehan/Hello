import React, { Component } from 'react';
import {Table, FormGroup, ControlLabel, FormControl} from 'react-bootstrap';
import './MessageList.css';

class MessageList extends Component {
  constructor(props){
    super(props);
    this.state= {
      messages: [],
      newMessage: ""
    };

  this.messagesRef = this.props.firebase.database().ref('messages');
  this.createMessage = this.createMessage.bind(this);
  this.handleSubmit = this.handleSubmit.bind(this);
  this.formatTime = this.formatTime.bind(this);
}

  componentDidMount() {
    this.messagesRef.on('child_added', snapshot => {
      const message = snapshot.val();
      message.key = snapshot.key;
    this.setState({ messages: this.state.messages.concat(message)})
    });
  }

  createMessage(event) {
    this.setState({newMessage: event.target.value});
  }

  handleSubmit(event) {
  event.preventDefault();
  console.log(this.props.activeRoom.key);
  this.messagesRef.push({
    content: this.state.newMessage,
    roomID: this.props.activeRoom.key,
    sentAt: this.props.firebase.database.ServerValue.TIMESTAMP,
    username: this.props.user ? this.props.user.displayName : 'Guest'
  });
  this.setState({newMessage: ""});
  }

  formatTime(input) {
    let time = new Date(input);
    return time.toGMTString() + '\n' + time.toLocaleTimeString();
  }

  render() {
    return (
      <div>
      <h3>{this.props.activeRoom.name}</h3>
      <div className= "retrievingMessageList">
        {this.state.messages
          .filter(message => message.roomID === this.props.activeRoom.key)
          .map((message, index)=>
            <Table striped condensed responsive key={index}>
              <thead>
                <tr>
                  <th>{message.username}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{message.content}</td>
                  <td>{this.formatTime(message.sentAt)}</td>
                </tr>
              </tbody>
            </Table>
          )}
      </div>

      <div className="fixed-bottom">
      <form className="createMessageForm" onSubmit={this.handleSubmit}>
       <FormGroup>
        <ControlLabel>New Message:</ControlLabel>
          <FormControl type="text" value={this.state.newMessage} placeholder="Enter message"
            onChange={this.createMessage} />
          <input type="submit" value="Submit" />
        </FormGroup>
        </form>
      </div>
      </div>
    )
  }
}

export default MessageList;
