import React from 'react';
import {
  BrowserRouter as Router,
  Switch, Route, Link
} from "react-router-dom";

import LandingPage from "./components/views/LandingPage/LandingPage";
import LoginPage from "./components/views/LoginPage/LoginPage";
import RegisterPage from "./components/views/RegisterPage/RegisterPage";
import Auth from './hoc/auth';

function App() {
  return (
    <Router>
      <>
        <Switch>
          {/*  admin만 들어가길 원한다면 ,true 옵션 추가 */}
          
          {/* 누구나 출입가능 */}
          {/* <Route exact path="/" component={LandingPage} /> */}
          <Route exact path="/" component={Auth(LandingPage,null)} />

          {/* 로그인한 유저는 출입불가능 */}
          {/* <Route exact path="/login" component={LoginPage} /> */}
          <Route exact path="/login" component={Auth(LoginPage,false)} />
          {/* <Route exact path="/register" component={RegisterPage} /> */}
          <Route exact path="/register" component={Auth(RegisterPage,false)} />

        </Switch>
      </>

    </Router>
  )
}

export default App;
