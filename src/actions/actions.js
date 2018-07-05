import * as types from '../constants/actionTypes';

export const displayUsers = users => ({ type: types.DISPLAY_USERS, users })
export const gitIgnore = user => ({ type: types.GIT_IGNORE, user })
export const gitCommit = user => ({ type: types.GIT_COMMIT, user })

export const getMatches = users => ({ type: types.GET_MATCHES, users })
