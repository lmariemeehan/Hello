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

	handleSubmit(event) {
		event.preventDefault();
		if(!this.state.newRoomName) { return }
		this.roomsRef.push({
			name: this.state.newRoomName,
	});
		this.setState({newRoomName: ''});
	}

	deleteRoom(roomID) {
		this.roomsRef.child(roomID.key).remove();
		this.props.setActiveRoom("");
	}

  render() {
    return (
			<div>
				<ul className="retrievingRoomList">
					{this.state.rooms.map((room, index) => (
						<li key={index}>
						 	<span className="eachRoom" onClick={() => this.props.setActiveRoom(room)}>{room.name}</span>
							<span className="deleteButton"><ion-icon name="trash"></ion-icon></span>

								<div className="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
								  <div className="modal-dialog" role="document">
								    <div className="modal-content">
								      <div className="modal-header">
								        <h5 className="modal-title" id="exampleModalLabel">{room.name}</h5>
								        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
								          <span aria-hidden="true">&times;</span>
								        </button>
								      </div>
								      <div classclassName="modal-body">
								        testing
								      </div>
								      <div className="modal-footer">
								        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
								        <button type="button" className="btn btn-primary" onClick={this.deleteRoom}>Delete</button>
								      </div>
								    </div>
								  </div>
								</div>
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
