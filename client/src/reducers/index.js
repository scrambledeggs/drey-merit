import { combineReducers } from 'redux';
import {authReducer} from './authReducer';
import {usersReducers} from './usersReducer';
import { reducer as reduxForm } from 'redux-form';

export default combineReducers({
	form: reduxForm,
	auth: authReducer,
	users: usersReducers,
})


