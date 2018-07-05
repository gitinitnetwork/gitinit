import * as types from '../constants/actionTypes';

export const displayUsers = users => ({ type: types.DISPLAY_USERS, users });
export const gitIgnore = index => ({ type: types.GIT_IGNORE, index });
export const gitCommit = index => ({ type: types.GIT_COMMIT, index });
export const loadMatches = users => ({ type: types.LOAD_MATCHES, users });
export const setLogin = login => ({ type: types.SET_LOGIN, login });
