import React, { Component } from 'react';
import * as firebase from 'firebase';
import '../styles/roomlist.css';

class RoomList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			rooms: [],
			newRoomName: ''
		};

	this.roomsRef = this.props.firebase.database().ref('rooms');
	this.deleteRoom = this.deleteRoom.bind(this);
	this.handleSubmit = this.handleSubmit.bind(this);
	this.createRoom = this.createRoom.bind(this);
	}

	componentDidMount() {
		this.roomsRef.on('child_added', snapshot => {
			const room = snapshot.val();
			room.key = snapshot.key;
		this.setState({ rooms: this.state.rooms.concat(room) })
		});
	}

	createRoom(e){
		this.setState({newRoomName: e.target.value});
	}

	handleSubmit(e) {
		e.preventDefault();
		if(!this.state.newRoomName) { return }
		this.roomsRef.push({
			name: this.state.newRoomName,
	});
		this.setState({newRoomName: ''});
	}

	deleteRoom(index) {
		let deletedRoom = firebase.database().ref('/rooms/{index}');
		deletedRoom.remove();
	}

  render() {
    return (
			<div>
				<ul className="retrievingRoomList">
					{this.state.rooms.map((room, index) => (
						<li key={index}>
						 	<span className="eachRoom" onClick={() => this.props.setActiveRoom(room)}>{room.name}</span>
							<span className="deleteButton">
								<ion-icon name="trash" onClick={() => this.deleteRoom(index)}></ion-icon>
							</span>
						</li>
					)
					)}
				</ul>


				<form className="createNewRoom" onSubmit={this.handleSubmit}>
					<input type="text" value={this.state.newRoomName} placeholder="New room..." onChange={this.createRoom}/>
					<button className="submit-button"><ion-icon name="add-circle"></ion-icon>Add</button>
				</form>

			</div>
	  )
  }
}

export default RoomList;
