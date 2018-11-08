import React, { Component } from 'react';

class MessageList extends Component {
  constructor(props){
    super(props);
    this.state= {
      messages: [],
      content: "",
      roomID: "",
      sentAt: "",
      username: ""
    };

  this.messagesRef = this.props.firebase.database().ref('messages').orderByChild('roomID').equalTo('roomID');
  this.createMessage = this.createMessage.bind(this);
}

  componentDidMount() {
    this.messagesRef.on('child_added', snapshot => {
      const message = snapshot.val();
      message.key = snapshot.key;
    this.setState({ messages: this.state.messages.concat(message)})
    });
  }

  createMessage(event) {
    event.preventDefault();
    this.messagesRef.push({
      content: this.state.content,
      roomID: this.state.roomID,
      username: this.state.username,
      sentAt: this.props.firebase.database.ServerValue.TIMESTAMP
  });
    this.setState({newmessage: ""});
  }

  render() {
    return (
      <div>
      <h2>Messages</h2>
      <ul className= "retrievingMessageList">
        {this.state.messages
          .map((message, index)=>
            <div key= {index}>
            <li className="roomID">{message.roomID}</li>
            <li className="username">{message.username}</li>)
            <li className="content">{message.content}</li>
            <li className="sentAt">{message.sentAt}</li>
            </div>
        )}
      </ul>

      <form className="createMessages" onSubmit={this.handleSubmit}>
        <label>
        New Message:
        <input type="text" value={this.state.newMessage} placeholder="Message" onChange={this.createMessage}/>
        </label>
        <input type="submit" value="Submit" />
      </form>
      </div>
    )
  }
}

export default MessageList;
