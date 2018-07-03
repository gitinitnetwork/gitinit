import { combineReducers } from 'redux';
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


const reducers = combineReducers({
  

});

export default reducers;
