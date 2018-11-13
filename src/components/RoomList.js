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
		this.roomsRef.push({
			name: this.state.newRoomName,
	});
		this.setState({newRoomName: ''});
	}

  render() {
    return (
			<div>
				<h2>Please select a room</h2>
    			<ul className="retrievingRoomList">{this.state.rooms.map((room) =>
						(<li className="eachRoom" key={room.name} onClick={() => this.props.setActiveRoom(room)}>{room.name}</li>))}
						</ul>

						<form className="createNewRoom" onSubmit={this.handleSubmit.bind(this)}>
						<label>
							New Room Name:
						<input type="text" value={this.state.newRoomName} placeholder="Room" onChange={this.createRoom.bind(this)}/>
						</label>
						<input type="submit" value="Submit" />
					</form>
			</div>
	  )
  }
}


export default RoomList;
