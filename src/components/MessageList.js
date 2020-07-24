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
      <div className="container-fluid d-flex flex-column justify-content-between min-vh-100 messages">

        <div>
          <h1 className="text-primary pl-3 pt-5 pb-5">{this.props.activeRoom.name}</h1>
          <div className="retrieveMessages">
            {this.state.messages
              .filter(message => message.roomID === this.props.activeRoom.key)
              .map((message, index)=>
                <ul className="bg-white" key={index}>
                  <li>
                    <div className="font-weight-bolder">
                      <span className="contact-icon align-middle mr-2"><ion-icon name="contact"></ion-icon></span>
                      <span className="message-username">{message.username} |</span>
                      <span className="text-muted ml-2">{this.formatTime(message.sentAt)}</span>
                    </div>
                    <p className="message-content pb-3">{message.content}
                      <span className="delete-message pr-5"><ion-icon name="close" onClick={ () => this.deleteMessage(message)}>Delete</ion-icon></span>
                    </p>
                  </li>
                </ul>
              )}
          </div>
        </div>

        <form className="pl-3" id="createNewMessage" onSubmit={this.handleSubmit}>
          <div className="form-row mb-3">
            <div className="col-10 px-0">
              <label htmlFor="form-control"></label>
                <input 
                  id="new-message"
                  type="text"
                  name="form-control" 
                  className="form-control" 
                  value={this.state.newMessage} 
                  placeholder="New message..."
                  onChange={this.createMessage} />
            </div>
            <div className="col-2 px-0">
              <button className="btn btn-primary" type="submit" id="new-message-button">    
                <ion-icon name="paper-plane-outline"></ion-icon>
              </button>
            </div>
          </div>
        </form>

      </div>
    )
  }
}

export default MessageList;
