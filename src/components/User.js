import React, { Component } from 'react';

class User extends Component {

  componentDidMount(){
    this.props.firebase.auth().onAuthStateChanged( user => {
    this.props.setUser(user);
  });
  }

  signIn() {
    const provider = new this.props.firebase.auth.GoogleAuthProvider();
    this.props.firebase.auth().signInWithPopup( provider );
  }

  signOut() {
    this.props.firebase.auth().signOut();
  }

  render() {
  return (
    <section id="buttons">
      <button id="sign-in" onClick={this.signIn.bind(this)}>
        <span className="ion-log-in"></span>
      </button>
      <button id="sign-out" onClick={this.signOut.bind(this)}>
        <span className="ion-log-out"></span>
      </button>
      <p>{this.props.user ? this.props.user : "GUEST" } is logged in</p>
    </section>

  );
  }
}

export default User;
