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

		this.roomsRef.on('child_removed', snapshot => {
			const deletedRoom = snapshot.val();
			deletedRoom.key = snapshot.key;
		this.setState({ rooms: this.state.rooms.filter( room => room.key !== deletedRoom.key)})
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

	deleteRoom(room) {
		this.roomsRef.child(room.key).remove();
		this.props.setActiveRoom('');
	}

  render() {
    return (
			<div className="container-fluid">
			<div className="row">
			<div className="col">
				<div className="my-3">
				<p>ROOMS</p>
					<ul className="retrievingRoomList">
						{this.state.rooms.map((room, index) => (
							<li key={index} className="px-3">
								<div className="eachRoom" onClick={() => this.props.setActiveRoom(room)}>{room.name}
								<span>
								<ion-icon name="create"></ion-icon>
								<ion-icon name="close-circle-outline" onClick={() => this.deleteRoom(room)}></ion-icon>
								</span>
								</div>
							</li>
						))}
					</ul>
				</div>

				<div className="primary-buttons">
					<button type="button" id="new-room-modal-button" className="btn btn-primary mb-4" data-toggle="modal" data-target="#newRoomModal"><ion-icon name="add-circle"></ion-icon>New Room</button>
				</div>

				<div className="modal fade" id="newRoomModal" tabIndex="-1" role="dialog" aria-labelledby="newRoomModal" aria-hidden="true">
				  <div className="modal-dialog" role="document">
				    <div className="modal-content">
				      <div className="modal-header">
				        <h5 className="modal-title">Create a new room</h5>
				        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
				          <span aria-hidden="true">&times;</span>
				        </button>
				      </div>
				      <div className="modal-body">
								<form className="createNewRoom" onSubmit={this.handleSubmit}>
									<div className="form-group text-center">
										<input type="text" value={this.state.newRoomName} id="room-name" placeholder="New room name..." onChange={this.createRoom}/>
									</div>
							<div className="modal-footer">
								<button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
								<div className="primary-buttons">
								<button type="submit" className="btn btn-primary"><ion-icon name="add-circle"></ion-icon> Add </button>
								</div>
							</div>
								</form>
				      </div>
				    </div>
				  </div>
				</div>
			</div>
			</div>
			</div>
	  )
  }
}

export default RoomList;
