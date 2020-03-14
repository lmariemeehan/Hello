import React, { Component } from 'react';
import '../styles/messagelist.scss';

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
      <div className="container-fluid p-0 messages">
        <header className="pl-3 py-2 text-primary">
          <span>{this.props.activeRoom.name}</span>
          <span className="far fa-comment-dots text-secondary font-weight-bold"></span>
        </header>

        <div className= "retrieveMessages">
          {this.state.messages
            .filter(message => message.roomID === this.props.activeRoom.key)
            .map((message, index)=>
              <ul key={index}>
                <li>
                  <div>
                  <span className="contact-icon align-middle mr-2"><ion-icon name="contact"></ion-icon></span>
                    <span className="message-username">{message.username} |</span>
                    <span className="text-muted ml-2">{this.formatTime(message.sentAt)}</span>

                  </div>
                    <div className="message-content">{message.content}
                    <span className="delete-message"><ion-icon name="close" onClick={ () => this.deleteMessage(message)}>Delete</ion-icon></span>
                    </div>
                </li>
              </ul>
            )}
        </div>

        <form className="container" id="createNewMessage" onSubmit={this.handleSubmit}>
          <div className="form-row mb-3">
            <div className="col px-0">
             <input type="text" className="form-control" value={this.state.newMessage} placeholder="New message..."
              onChange={this.createMessage} />
            </div>
            <div className="col-2 px-0">
              <button className="btn btn-primary" type="submit" id="new-message-button">Send <i className="far fa-paper-plane"></i></button>
            </div>
          </div>
        </form>

      </div>
    )
  }
}

export default MessageList;
