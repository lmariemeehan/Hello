import React, { Component } from 'react';

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

  render() {
    return (
			<div>

  			<table className="retrievingRoomList">
					<tbody>{this.state.rooms.map((room, index) =>
						(<tr className="eachRoom" key={index} onClick={() => this.props.setActiveRoom(room)}>{room.name}</tr>))}</tbody>
				</table>

				<form className="createNewRoom" onSubmit={this.handleSubmit.bind(this)}>
					<label>
						Create New Room:
					<input type="text" value={this.state.newRoomName} placeholder="New Room..." onChange={this.createRoom.bind(this)}/>
					</label>

					<button className="submit-button"><ion-icon name="add-circle"></ion-icon>Add Room</button>
				</form>

			</div>
	  )
  }
}

export default RoomList;
