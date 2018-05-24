import React, { Component } from 'react';
import UsersList from './user/UsersList';
import './app.css';

class Home extends Component {
	render() {
		return (
			<div>
				<h1>BOOKY</h1>
				<UsersList />
			</div>
		);
	}
}

export default Home;