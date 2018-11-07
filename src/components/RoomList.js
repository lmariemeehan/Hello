import React, { Component } from 'react';
import './RoomList.css';

class RoomList extends Component {
	constructor(props) {
		super(props);
		this.state = {
		rooms: [],
		newRoomName: '',
		};

	this.roomsRef = this.props.firebase.database().ref('rooms');
	this.createRoom = this.createRoom.bind(this);
	this.handleSubmit = this.handleSubmit.bind(this);
	}

	componentDidMount() {
		this.roomsRef.on('child_added', snapshot => {
			const room = snapshot.val();
			room.key = snapshot.key;
		this.setState({ rooms: this.state.rooms.concat(room)})
		});
	}


	createRoom(event){
		this.setState({newRoomName: event.target.value});
	}

	handleSubmit(event) {
		event.preventDefault();
		this.roomsRef.push({
			name: this.state.newRoomName
	});
		this.setState({newRoomName: ''});
	}

  render() {
    return (
			<div>
    	<ul className="roomList">{this.state.rooms.map((room) => (<li>{room.name}</li>))}</ul>
			<form onSubmit={this.handleSubmit}>
				<label>
				New Room Name:
				<input type="text" value={this.state.newRoomName} placeholder="Room" onChange={this.createRoom}/>
				</label>
				<input type="submit" value="Submit" />
			</form>
			</div>
	  )
  }
}


export default RoomList;
