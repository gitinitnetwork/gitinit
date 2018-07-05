import * as types from '../constants/actionTypes';

const homeInitialState = {
  userLogin: '',
  pendingUsers: [
    {
      login: 'Leo',
      avatar_url: '',
      followers: 9,
    },
  ],
  matches: [],
};

const matchReducer = (state = homeInitialState, action) => {
  switch (action.type) {
    case types.DISPLAY_USERS: {
      console.log('in match reducer');
      const newState = JSON.parse(JSON.stringify(state));
      newState.pendingUsers = action.users;
      return newState;
    }
    case types.GIT_IGNORE:
      return state;

    case types.GIT_COMMIT:
      return state;

    case types.LOAD_MATCHES: {
      const newState = JSON.parse(JSON.stringify(state));
      newState.matches = action.users;
      return newState;
    }

    case types.SET_LOGIN: {
      const newState = JSON.parse(JSON.stringify(state));
      newState.userLogin = action.login;
      return newState;
    }

    case types.SWIPE_RIGHT:
      return state;

    case types.LOG_OUT:
      return state;

    default:
      return state;
  }
};

export default matchReducer;
