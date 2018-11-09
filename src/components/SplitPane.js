import React, { Component } from 'react';
import './SplitPane.css';

class SplitPane extends Component {
  constructor(props){
    super(props);
    this.state = {left: "", right: ""};
  }
  render() {
  return (
    <div className="Panes">
      <div className="SplitPane-left">
        {this.state.left}
      </div>
      <div className="SplitPane-right">
        {this.state.right}
      </div>
    </div>
    );
  }
}

export default SplitPane;
