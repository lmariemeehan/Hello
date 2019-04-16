import React, { Component } from 'react';

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSignedIn: false
    }
}

  componentDidMount(user){
    this.props.firebase.auth().onAuthStateChanged( user => {
    this.props.setUser(user);
  });
  }

  signIn() {
    const provider = new this.props.firebase.auth.GoogleAuthProvider();
    this.props.firebase.auth().signInWithPopup( provider );
    this.setState({isSignedIn: true});
  }

  signOut() {
    this.props.firebase.auth().signOut();
    this.setState({isSignedIn: false});
  }

  handleSignClick(user) {
    const isSameUser = this.props.setUser === user;
    if (this.state.isSignedIn === isSameUser) {
      this.signOut();
    } else {
      this.signIn();
    }
  }

  render() {
  return (
    <section id="buttons">
      <button id="in-out" onClick={this.state.handleSignClick}>
      <span className={this.state.isSignedIn ? "ion-log-in" : "ion-log-out"}></span>
      </button>
      <p>{this.props.user ? this.props.user.displayName : "GUEST" } is logged in</p>
    </section>
  );
  }
}

export default User;
