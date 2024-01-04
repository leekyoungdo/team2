// Redux Reducer
// 닉네임

import { SET_NICKNAME } from '../action/nicknameAction.js';

export const nicknameReducer = (state = '', action) => {
  switch (action.type) {
    case SET_NICKNAME:
      return action.payload;
    default:
      return state;
  }
};
