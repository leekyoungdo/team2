// Redux Action
// 닉네임
export const SET_NICKNAME = 'SET_NICKNAME';

export const setNickname = (nickname) => ({
  type: SET_NICKNAME,
  payload: nickname,
});
