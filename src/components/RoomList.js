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

  			<table className="retrievingRoomList">{this.state.rooms.map((room) =>
					(<tr className="eachRoom" key={room.name} onClick={() => this.props.setActiveRoom(room)}>{room.name}</tr>))}
				</table>

				<form className="createNewRoom" onSubmit={this.handleSubmit.bind(this)}>
					<label>
						Create New Room:
					<input type="text" value={this.state.newRoomName} placeholder="Room Name" onChange={this.createRoom.bind(this)}/>
					</label>
					<input className="submit-button" type="submit" value="Submit" />
				</form>

			</div>
	  )
  }
}

export default RoomList;
