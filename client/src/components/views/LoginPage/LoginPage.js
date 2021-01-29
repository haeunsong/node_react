import React, { useState } from 'react';
import Axios from 'axios';
import {useDispatch} from 'react-redux';
import {loginUser} from '../../../_actions/user_actions';

const LoginPage = (props) => {

  const dispatch = useDispatch();

  const [Email,setEmail] = useState("");
  const [Password,setPassword] = useState("")

  const onEmailHandler=(e)=>{
    setEmail(e.target.value);
    // setEmail(e.currentTarget.value)
  }
  const onPasswordHandler=(e)=>{
    setPassword(e.target.value);
  }

  const onSubmitHandler=(e)=>{
    e.preventDefault();

    let body = {
      email:Email,
      password:Password
    }

// loginUser라는 액션을 dispatch한다.(보낸다)
// 리덕스를 사용하지 않으면 원래 여기서
// axios.post('/api/login',body) 이런식으로 써준다.

    dispatch(loginUser(body))
    .then(resp=>{
      if(resp.payload.loginSuccess){
        props.history.push('/')
      }else{
        alert('Error')
      }
    })

  }

  return (
    <div style={{display:'flex', justifyContent:'center',alignItems:'center'
      ,width:'100%',height:'100vh'
    }}>
      <form style={{display:'flex',flexDirection:'column'}}
        onSubmit={onSubmitHandler}
      >

        <label>Email</label>
        <input type="email" value={Email} onChange={onEmailHandler}/>
        <label>Password</label>
        <input type="password" value={Password} onChange={onPasswordHandler}/>
        <br />
        <button>
          Login
        </button>

      </form>
    </div>
  );
};

export default LoginPage;