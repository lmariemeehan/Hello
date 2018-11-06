import React, { Component } from 'react';
import Roomlist from 'RoomList';
import MessageList from 'MessageList';

class ActiveRoom extends Component {

  splitPane(props) {
    return (
      <div className="SplitPane">
      <div className="SplitPane-left">{this.props.RoomList}</div>
      <div className="SplitPane-right">{this.props.MessageList}</div>
      </div>
    )
  }

  render() {
    return (
      <splitPane left= {this.props.RoomList} right= {this.props.MessageList} />
    )
  }
}

export default ActiveRoom;
