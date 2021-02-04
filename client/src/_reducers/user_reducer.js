import {LOGIN_USER,REGISTER_USER,AUTH_USER} from '../_actions/types';


// 매개변수 state는 이전의 상태
export default function (state={},action){
  // 다른 타입이 올때마다 다르게 처리
  switch (action.type) {
    case LOGIN_USER:
      return {...state, loginSuccess: action.payload} 
      break;
    case REGISTER_USER:
      return {...state, register: action.payload}
      break;
    case AUTH_USER:
      // action.payload 부분에 모든 유저 데이터가 들어있다.
      return {...state, userData: action.payload}
    default:
      return state;
  }
}