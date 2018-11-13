import React, { Component } from 'react';

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
    username: this.props.user.displayName
  });
  this.setState({newMessage: ""});
  }

formatTime() {
  let unixTime = this.props.firebase.database.ServerValue.TIMESTAMP;
  let localTime = unixTime.toLocaleTimeString();
  this.setState({currentTime: localTime});
}

  render() {
    return (
      <div>
      <ul className= "retrievingMessageList">
        {this.state.messages
          .filter(message => message.roomID === this.props.activeRoom.key)
          .map((message, index)=>
            <div key= {index}>
            <li className="username">{message.username}</li>
            <li className="content">{message.content}</li>
            <li className="sentAt">{message.sentAt}</li>
          </div>
        )}
      </ul>

      <form className="createMessages" onSubmit={this.handleSubmit}>
        <label>
          New Message:
          <input type="text" value={this.state.newMessage} placeholder="Message"
            onChange={this.createMessage} />
          </label>
          <input type="submit" value="Submit" />
        </form>

      </div>
    )
  }
}

export default MessageList;
