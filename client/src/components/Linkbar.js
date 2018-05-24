import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink, withRouter} from 'react-router-dom';
import './app.css';

class Linkbar extends Component {
  state = {
    isOpen: false,
  };

  toggleClass = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  renderAuth() {
    //this props is produced by the auth reducer
    switch (this.props.auth) {
      //null is making request to backend to get current user
      case null:
        return;
      //false is request done, user *is not* logged in
      case false:
        return (
          <a href="/auth/google">Login With Google</a>
        );
      //User Model request complete, user is logged in  
      default:
        return (
         <a href="/api/logout">Logout</a>
        );
    }
  }

  renderCredits() {
    //this props is produced by the auth reducer
    switch (this.props.auth) {
      //null is making request to backend to get current user
      case null:
        return;
      //false is request done, user *is not* logged in
      case false:
        return (
          0
        );
      //User Model request complete, user is logged in  
      default:
        return (
         this.props.auth.credits
        );
    }
  }

  render() {
    const element_ul = this.state.isOpen ? "open" : "";
    const element_button = this.state.isOpen ? "open nav-hamburger" : "nav-hamburger";
    return (

      <header className='navbar'>
        <div className="navbar-header">
          <a className="nav-logo" href="/users">Booky</a>
          <button className={element_button} onClick={this.toggleClass}>
            <span className="nav-stripe"></span>
            <span className="nav-stripe"></span>
            <span className="nav-stripe"></span>
          </button>
        </div>
        <div className="nav-menu">
          <ul className={element_ul}>
            <li key="1"><NavLink to="/users" activeClassName="active">Home</NavLink></li>
          <li key="2"><NavLink to="/cart" activeClassName="active">Score: { this.renderCredits() }</NavLink></li>
          <li key="5">{ this.renderAuth() }</li>
          </ul>
        </div>
      </header>
      );
  }
}

function mapStateToProps({auth}) {
  return { auth };
}

export default withRouter(connect(mapStateToProps)(Linkbar));