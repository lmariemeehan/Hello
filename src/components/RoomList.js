import React, { Component } from 'react';
import '../styles/roomlist.css';

class RoomList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			rooms: [],
			newRoomName: ''
		};

	this.roomsRef = this.props.firebase.database().ref('rooms');
	}

	componentDidMount() {
		this.roomsRef.on('child_added', snapshot => {
			const room = snapshot.val();
			room.key = snapshot.key;
		this.setState({ rooms: this.state.rooms.concat(room)})
		});
	}

	componentWillUnmount() {
		this.roomsRef.on('child_removed', snapshot => {
			const deletedroom = snapshot.val();
			deletedroom.key = snapshot.key;
		this.setState({ rooms: this.state.rooms.filter(room => room.key !== deletedroom.key)})
		});
	}

	createRoom(event){
		this.setState({newRoomName: event.target.value});
	}

	handleSubmit(event) {
		event.preventDefault();
		if(!this.state.newRoomName) { return }
		this.roomsRef.push({
			name: this.state.newRoomName,
	});
		this.setState({newRoomName: ''});
	}

	deleteRoom(event, roomID) {
		event.preventDefault();
		this.roomsRef.child(roomID.key).remove();
		this.props.setActiveRoom("");
	}

  render() {
    return (
			<div>

  			<table className="retrievingRoomList">
					<tbody>{this.state.rooms.map((room, index) =>
						(<tr className="eachRoom" key={index} onClick={() => this.props.setActiveRoom(room)}>{room.name}</tr>))}</tbody>
				</table>

				<form className="createNewRoom" onSubmit={this.handleSubmit.bind(this)}>
					<input type="text" value={this.state.newRoomName} placeholder="New room..." onChange={this.createRoom.bind(this)}/>
					<button className="submit-button"><ion-icon name="add-circle"></ion-icon>Add</button>
				</form>

			</div>
	  )
  }
}

export default RoomList;
