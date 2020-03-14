import React, { Component } from 'react';
import '../styles/sidebar.scss';

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
    <div className="container-fluid mt-4">
      <h1 className="align-middle text-warning"><span className="user-icon align-middle"><ion-icon name="contact"></ion-icon></span>Hello... </h1>
      <div className="user-info">
        <div className="btn-group dropdown">
          <button type="button" className="btn btn-transparent text-white font-weight-bold dropdown-toggle" 
                  data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  {this.props.user ? this.props.user.displayName : "GUEST" }
          </button>

          <div className="dropdown-menu py-2 text-muted">
            {this.props.user ?
              <button className="dropdown-item" onClick={this.signOut.bind(this)}>Logout</button> :
              <button className="dropdown-item" onClick={this.signIn.bind(this)}>Login</button>
            }
          </div>
        </div>
      </div>
    </div>

  );
  }
}

export default User;
