import React, { useEffect } from 'react';
import axios from 'axios';

const LandingPage = (props) => {

  useEffect(()=>{
    axios.get('/api/hello')
    .then(resp=>console.log(resp))
  },[])
  
  const onClickHandler = () => {
    axios.get('/api/logout')
    .then(resp=>{
      if(resp.data.success){
        props.history.push('/login')
      }else{
        alert('로그아웃에 실패했습니다.')
      }
      console.log(resp.data)
    })

  }

  return (
    <div style={{display:'flex', justifyContent:'center',alignItems:'center'
      ,width:'100%',height:'100vh'
    }}>
      <h2>시작 페이지</h2>

      <button onClick={onClickHandler}>
        로그아웃
      </button>
    </div>
  );
};

export default LandingPage;