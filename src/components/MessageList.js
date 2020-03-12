import React, { Component } from 'react';
import '../styles/messagelist.css';

class MessageList extends Component {
  constructor(props){
    super(props);
    this.state= {
      messages: [],
      newMessage: ""
    };

  this.messagesRef = this.props.firebase.database().ref('messages');
  this.createMessage = this.createMessage.bind(this);
  this.deleteMessage = this.deleteMessage.bind(this);
  this.handleSubmit = this.handleSubmit.bind(this);
  this.formatTime = this.formatTime.bind(this);
}

  componentDidMount() {
    this.messagesRef.on('child_added', snapshot => {
      const message = snapshot.val();
      message.key = snapshot.key;
    this.setState({ messages: this.state.messages.concat(message)})
    });

    this.messagesRef.on('child_removed', snapshot => {
      const deletedMessage = snapshot.val();
      deletedMessage.key = snapshot.key;
    this.setState({ messages: this.state.messages.filter( message => message.key !== deletedMessage.key)})
    })
  }

  createMessage(event) {
    this.setState({newMessage: event.target.value});
  }

  deleteMessage(message) {
    this.messagesRef.child(message.key).remove();
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
      <div className="container messages">

      <h2 className="activeRoom-name">{this.props.activeRoom.name}</h2>

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
                  <div className="message-content">{message.content}
                  <span className="delete-message"><ion-icon name="close" onClick={ () => this.deleteMessage(message)}>Delete</ion-icon></span>
                  </div>
              </li>
            </ul>
          )}
      </div>


        <form id="createNewMessage" onSubmit={this.handleSubmit}>

        <div className="container primary-buttons">
            <div className="form-row mb-3 fixed-bottom">
              <input type="text" className="form-control rounded-pill" value={this.state.newMessage} placeholder="New message..."
              onChange={this.createMessage} />
              <div className="col">
                <button className="btn btn-primary rounded-pill" type="submit" id="new-message-button">Send <i className="far fa-paper-plane"></i></button>
              </div>
            </div>
          </div>
        </form>


      </div>
    )
  }
}

export default MessageList;
