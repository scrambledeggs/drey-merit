import React, {Component} from 'react';
import {connect} from 'react-redux';
import {updateUsers} from '../../actions/usersActions';
import {bindActionCreators} from 'redux';
import { reduxForm, reset } from 'redux-form';

class User extends Component {
	render() {
		return (
			<div className="user-container" key={this.props._id}>
			 <form onSubmit={this.props.handleSubmit(this.props.updateUsers)}>
				<div className="user-name">{this.props.googleFname} {this.props.googleLname}</div>
				<input type="radio" name="score" value="1" /> Merit<br />
  				<input type="radio" name="score" value="-1" /> Demerit <br />
				<input className="user-comment" type="textbox" />
				<button className="btn-send" type="submit">ADD</button>
			</form>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		users: state.users.users,
	}
}

function mapsDispatchToProps(dispatch) {
	return bindActionCreators({
		updateUsers,
	}, dispatch)
}

//use redux-form's reset
const afterSubmit = (result, dispatch) =>
  dispatch(reset('user'));

User = connect(mapStateToProps, mapsDispatchToProps)(User);

export default reduxForm({
	form: 'user',
	//will destroy form after submit
	destroyOnUnmount: true,
	//will reset form after submit
	onSubmitSuccess: afterSubmit,
})(User);