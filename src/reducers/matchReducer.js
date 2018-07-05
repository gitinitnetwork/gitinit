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
  currentPending: 0,
  matches: [],
};

const matchReducer = (state = homeInitialState, action) => {
  switch (action.type) {
    case types.DISPLAY_USERS: {
      let newState = JSON.parse(JSON.stringify(state));
      newState.pendingUsers = action.users;
      newState.currentPending = Math.floor(Math.random() * newState.pendingUsers.length);
      return newState;
    }

    case types.GIT_IGNORE: {
      let newState = JSON.parse(JSON.stringify(state));
      newState.pendingUsers.splice(action.index, 1);
      console.log('ignoring', newState);
      return newState;
    }

    case types.GIT_COMMIT: {
      let newState = JSON.parse(JSON.stringify(state));
      newState.pendingUsers.splice(action.index, 1);
      console.log('commiting', newState);
      return newState;
    }

    case types.LOAD_MATCHES: {
      let newState = JSON.parse(JSON.stringify(state));
      newState.pendingUsers.splice(action.index, 1);
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
