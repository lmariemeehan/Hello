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
    username: this.props.user ? this.props.user.displayName : 'Guest'
  });
  this.setState({newMessage: ""});
  }

  formatTime(unixDate) {
    let time = new Date(unixDate);
    return time.toLocaleString();
  }

  render() {
    return (
      <div className="messages">
      <h3>{this.props.activeRoom.name}</h3>

      <div className= "retrieveMessages">
        {this.state.messages
          .filter(message => message.roomID === this.props.activeRoom.key)
          .map((message, index)=>
            <ul key={index}>
              <li>
                <div>
                  <span className="contact-icon"><ion-icon name="contact"></ion-icon></span>
                  <span className="message-username">{message.username} |</span>
                  <span className="message-sentAt">{this.formatTime(message.sentAt)}</span>
                </div>
                  <div className="message-content">{message.content}</div>
              </li>
            </ul>
          )}
      </div>

      <form className="createNewMessage" onSubmit={this.handleSubmit}>
        <label>New Message: </label>
          <input className="message-input" type="text" value={this.state.newMessage} placeholder="Enter message"
            onChange={this.createMessage} />
          <button className="submit-button">Send</button>
      </form>

      </div>
    )
  }
}

export default MessageList;
