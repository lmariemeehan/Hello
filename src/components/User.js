import React, { Component } from 'react';
import '../styles/user.css';

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

    <span className="user-icon"><ion-icon name="contact"></ion-icon></span>

    <p className="user-name">{this.props.user ? this.props.user.displayName : "GUEST" } </p>

    <button className="sign-in-out" onClick={this.signIn.bind(this)}>
      Sign In
    </button>

    <button className="sign-in-out" onClick={this.signOut.bind(this)}>
      Sign Out
    </button>

    </section>

  );
  }
}

export default User;
