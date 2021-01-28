const {User} = require("../models/User");

let auth = (req,res,next) => {

  // 인증 처리를 하는 곳

  // 클라이언트 쿠키에서 토큰을 가져온다.
  let token = req.cookies.x_auth;
  // 토큰을 복호화한 후 유저를 찾는다.
  User.findByToken(token,(err,user)=>{
    if(err) throw err;
    if(!user) return res.json({isAuth: false, error: true})

    // 유저가 있으면 정보를 넣어줌!! index.js에서 app.get('/api/users/auth'...
    // 부분함수에서 req token,user 사용할 수 있게 하려고 해줌.
    req.token = token;
    req.user = user;
    next(); // 미들웨어에서 넘어갈 수 있게 꼭 있어야함!!!
    // next()가 없으면 계속 미들웨어에 머물러있는다.
  })
  
  // 유저가 있으면 인증 okay
  // 없으면 인증 no

}

module.exports = {auth};