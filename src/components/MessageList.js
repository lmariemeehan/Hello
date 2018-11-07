import React, { Component } from 'react';

class MessageList extends Component {
  constructor(props){
    super(props);
    this.state= {
      Messages: [],
      newMessage: ""
    };

  this.MessagesRef = this.props.firebase.database().ref('Messages');
  this.createMessage = this.createMessage.bind(this);
	this.handleSubmit = this.handleSubmit.bind(this);
}

  componentDidMount() {
    this.MessagesRef.on('child_added', snapshot => {
      const message = snapshot.val();
      message.key = snapshot.key;
    this.setState({ Messages: this.state.Messages.concat(message)})
    });
  }

  createMessage(event){
    this.setState({newMessage: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    this.MessagesRef.push({
      name: this.state.newMessage
  });
    this.setState({newMessage: ''});
  }

  render() {
    return (
      <div>

      <ul className= "messageList">
        {this.state.Messages
          .filter((message) => message.roomID === this.props.activeRoom)
          .map((message, index)=>
            <div key= {index}>
            <li className="content">{message.content}</li>
            <li className="sentAt">{message.sentAt}</li>
            <li className="username">{message.username}</li>)
            </div>)}
      </ul>

      <form className="MessageSubmit" onSubmit={this.handleSubmit}>
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
