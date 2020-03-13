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
    <section id="user-section">

    <div className="container">
      <span className="user-icon"><ion-icon name="contact"></ion-icon></span>

      <div className="user-info">
        <p className="font-weight-bold">{this.props.user ? this.props.user.displayName : "GUEST" } </p>

        <div className="btn-group dropdown">
          <button type="button" className="btn btn-transparent dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></button>

          <div className="dropdown-menu p-2 text-muted">
            {this.props.user ?
              <button className="dropdown-item" onClick={this.signOut.bind(this)}>Logout</button> :
              <button className="dropdown-item" onClick={this.signIn.bind(this)}>Login</button>
            }
          </div>
        </div>
      </div>
    </div>

    </section>

  );
  }
}

export default User;
