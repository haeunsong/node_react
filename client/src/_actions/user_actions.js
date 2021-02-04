import React from 'react';
import axios from 'axios';
import {
  LOGIN_USER,REGISTER_USER,AUTH_USER
} from './types';

export function loginUser(dataTosubmit){
  const request = axios.post('/api/login',dataTosubmit)
    .then(resp=>resp.data);

  return {
    //request를 리듀서로 보내야한다.
    type: LOGIN_USER,
    payload: request
  }
}

export function registerUser(dataTosubmit){
  const request = axios.post('/api/register',dataTosubmit)
    .then(resp=>resp.data);

  return {
    //request를 리듀서로 보내야한다.
    type: REGISTER_USER,
    payload: request
  }
}

export function auth(){
  // get 메서드라서 body부분은 필요없음.
  const request = axios.get('/api/auth')
    .then(resp=>resp.data);

  return {
    //request를 리듀서로 보내야한다.
    type: AUTH_USER,
    payload: request
  }
}
