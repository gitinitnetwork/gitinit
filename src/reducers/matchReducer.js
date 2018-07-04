import * as types from '../constants/actionTypes';

const homeInitialState = {
  sampleusers: [
    {
      userName: 'Leo',
      userPhoto: 'https://files.slack.com/files-pri/TAZUURMB8-FBJB674RJ/img_5867.jpg',
      userBio: 'je cherche pour mon amour vrai ❤️'
    },
    {
      userName: 'Wilbur',
      userPhoto: 'https://files.slack.com/files-pri/TAZUURMB8-FBJ1WKT09/img_4712.jpg',
      userBio: 'just here for the belly rubs!'
    },
    {
      userName: 'Perch Kitty and Friend',
      userPhoto: 'https://files.slack.com/files-pri/TAZUURMB8-FBKKV4EPR/img_5550.jpg',
      userBio: 'PERCH 4 LYFE'
    }
  ]

  
}

const matchReducer = (state = homeInitialState, action) => {
  switch (action.type) {

    case types.SET_CLIENT_ID:
    return state;

    case types.SET_CLIENT_SECRET:
      return state;

    case types.SET_USER_TOKEN:
      return state;  

    case types.SWIPE_LEFT:
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