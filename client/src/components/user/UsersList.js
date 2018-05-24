import React, { Component } from 'react';
import {connect} from 'react-redux';
import {getUsers} from '../../actions/usersActions';
import {bindActionCreators} from 'redux';
import User from './User';


class UsersList extends Component {
	componentDidMount() {
		//Dispatch an action
		this.props.getUsers();
	}
	render() {
		const usersList = this.props.users.map(function(usersArr){
			return(
				<div key={usersArr._id}>
					<User
						_id={usersArr._id}
						googleFname={usersArr.googleFname}
						googleLname={usersArr.googleLname}
					/>       
				</div>
			)
		})
		return(
			<div className="users-list-container">
				<div className="users-list-flex" style={{marginTop: '15px'}}>
					{usersList}
				</div>
			</div>
		)
	}
}

function mapStateToProps(state) {
	return {
		users: state.users.users
	}
}
function mapDispatchToProps(dispatch){
	return bindActionCreators({
		getUsers
		}, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(UsersList);