import React, { Component } from 'react';
import { BrowserRouter, Route} from 'react-router-dom';
import { connect } from 'react-redux';
import Home from './Home.js';
import Linkbar from './Linkbar';
import {bindActionCreators} from 'redux';
import {fetchUser} from '../actions/authActions';

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    return (
      <div>
        <BrowserRouter>
          <div className="app_container">
            <Linkbar/>
            <Route exact path="/" component={Home} />
            <Route path="/users" component={Home} />
          </div>
        </BrowserRouter>  
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth
  }
}


function mapDispatchToProps(dispatch) {
  return bindActionCreators({ 
    fetchUser
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
