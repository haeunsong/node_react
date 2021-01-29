import React from 'react';
import axios from 'axios';
import {
  LOGIN_USER
} from './types';
export function loginUser(dataTosubmit){
  const request = axios.post('/api/login',dataTosubmit)
    .then(resp=>resp.data);

  return {
    //request를 리듀서로 보내야한다.
    type: "LOGIN_USER",
    payload: request
  }
}

