Send Message Fails

Attempt 1:
createMessage(event) {
  event.preventDefault();
  this.messagesRef.push({
    content: this.state.content,
    roomID: this.state.roomID,
    username: this.props.user,
    sentAt: this.props.firebase.database.ServerValue.TIMESTAMP
});
  this.setState({newmessage: ""});
}

Attempt 2:
createMessage(event) {
  event.preventDefault();
  this.messagesRef.push({
    content: this.state.content,
    roomID: this.state.roomID,
    username: this.props.setUser(),
    sentAt: this.props.firebase.database.ServerValue.TIMESTAMP
});
  this.setState({newmessage: ""});
}

Attempt 3:
createMessage(event) {
  this.setState({newMessage: event.target.value});
}

handleSubmit(event) {
event.preventDefault();
this.messagesRef.push({
  content: this.state.content,
  roomID: this.state.roomID,
  sentAt: this.props.firebase.database.ServerValue.TIMESTAMP,
  username: this.state.username
});
this.setState({content: "", roomID: "", sentAt: "", username: ""});
}

Attempt 4:
handleSubmit(event) {
event.preventDefault();
this.messagesRef.push({
  content: this.state.content,
  roomID: this.state.roomID,
  sentAt: this.props.firebase.database.ServerValue.TIMESTAMP,
  username: this.state.username.displayName
});
this.setState({newMessage: event});
}

Attempt 5:
handleSubmit(event) {
event.preventDefault();
this.messagesRef.push({
  content: this.state.content,
  roomID: this.state.roomID,
  sentAt: this.props.firebase.database.ServerValue.TIMESTAMP,
  username: this.props.setUser(user)
});
this.setState({newMessage: event});
}

Attempt 6:
handleSubmit(event) {
event.preventDefault();
this.messagesRef.push({
  content: this.state.content,
  roomID: this.state.roomID,
  sentAt: this.props.firebase.database.ServerValue.TIMESTAMP,
  username: this.props.firebase.auth().currentUser
});
this.setState({newMessage: ""});
}

Attempt 7: Content and timestamp works but username and roomID does not.
handleSubmit(event) {
event.preventDefault();
this.messagesRef.push({
  content: this.state.newMessage,
  roomID: this.props.activeRoom.key,
  sentAt: this.props.firebase.database.ServerValue.TIMESTAMP,
  username: this.state.username
});
this.setState({newMessage: ""});
}

Attempt 8:
handleSubmit(event) {
event.preventDefault();
this.messagesRef.push({
  content: this.state.newMessage,
  roomID: this.props.setActiveRoom, [I also tried this.props.setActiveRoom()]
  sentAt: this.props.firebase.database.ServerValue.TIMESTAMP,
  username: this.state.username
});
this.setState({newMessage: ""});
}

Attempt 9:
handleSubmit(event) {
event.preventDefault();
this.messagesRef.push({
  content: this.state.newMessage,
  roomID: this.props.activeRoom,
  sentAt: this.props.firebase.database.ServerValue.TIMESTAMP,
  username: this.props.user.username
});
this.setState({newMessage: ""});
}

Attempt 10:
handleSubmit(event) {
event.preventDefault();
this.messagesRef.push({
  content: this.state.newMessage,
  roomID: this.props.activeRoom,
  sentAt: this.props.firebase.database.ServerValue.TIMESTAMP,
  username: this.props.firebase.auth().onAuthStateChanged( user => {
  this.props.setUser(user)
})
this.setState({newMessage: ""});
}
