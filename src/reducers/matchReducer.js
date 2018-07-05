import * as types from '../constants/actionTypes';

const homeInitialState = {
  pendingUsers: [
    {
      login: 'Leo',
      avatar_url: '',
      followers: 9,
    },
  ],
  
}

const matchReducer = (state = homeInitialState, action) => {
  switch (action.type) {
    case types.DISPLAY_USERS:
      let newState = JSON.parse(JSON.stringify(state));
      newState.pendingUsers = action.users;
      console.log('in match reducer', newState)
      return newState;

    case types.GIT_IGNORE:
      return state;

    case types.GIT_COMMIT:
      return state;  

    case types.GET_MATCHES:
      return state;

    case types.SWIPE_RIGHT:
      return state;

    case types.GET_MATCHES:
      return state;
    
    case types.LOG_OUT:
      return state;

    default:
      return state;

  }};

  export default matchReducer;