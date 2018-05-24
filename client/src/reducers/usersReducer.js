//USERS REDUCERS
export function usersReducers(state={
  users:[]
  }, action) {
  switch(action.type){
    case "GET_USERS":
      return {...state, users:[...action.payload]};

    case "UPDATE_USER":
  //create a copy of the current array of users
  const currentUserToUpdate = [...state.users];
  //determine at which index in users array is the user to be updated
  const indexToUpdate = currentUserToUpdate.findIndex(
    function(user) {
      return user._id === action.payload._id;
    }
  );
  //create a new users object with the new values and with the same array index of the user we want to replace. To achieve this we will use ...spread but we could use concat methods too
  const newUserToUpdate = {
    ...currentUserToUpdate[indexToUpdate],
    credits: action.payload.credits
  };
  //this log has the purpose to show you how newUserToUpdate looks like
  //use slice to remove the user at the specified index, replace with the new object and concatenate with the rest of users in the array
  return {users: [...currentUserToUpdate.slice(0, indexToUpdate), newUserToUpdate,
    ...currentUserToUpdate.slice(indexToUpdate + 1)]};

  default:
    return state;
  }
}

