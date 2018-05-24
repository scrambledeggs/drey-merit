import axios from 'axios';

//GET USERS
export function getUsers(){
	return function(dispatch){
		axios.get("/api/users")
			.then(function(response){
				dispatch({type:"GET_USERS", payload:response.data})
				// users data
				// console.log(response.data)
			})
			.catch(function(err){
				dispatch({type:"GET_USERS_REJECTED", payload:err})
			})
	}
}

//UPDATE USER
export function updateUsers(_id, credits) {
	return function(dispatch) {
		axios.put("/api/users/" + _id, credits)
			.then(function(response){
				// console.log('credit',credit);
				dispatch({type:"UPDATE_USER", payload:_id})
			})
			.catch(function(err){
				dispatch({type:"UPDATE_USER_REJECTED", payload:err})
			})
	}
}
