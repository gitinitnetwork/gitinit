import * as types from '../constants/actionTypes';

export const displayUsers = users => ({ type: types.DISPLAY_USERS, users });
export const gitIgnore = user => ({ type: types.GIT_IGNORE, user });
export const gitCommit = user => ({ type: types.GIT_COMMIT, user });
export const loadMatches = users => ({ type: types.LOAD_MATCHES, users });
export const setLogin = login => ({ type: types.SET_LOGIN, login });
