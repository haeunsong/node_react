var express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const port = 5000;

const config = require('./config/key');
// user model 가져오기
const { User } = require("./models/User");
const {auth} = require("./middleware/auth");

// bodyParser에 옵션주기
// bodyParser: client에서 오는 정보를 서버에서 분석할 수 있게 해주는 것

// application/json 분석할 수 있게 해줌.
app.use(bodyParser.json());

// application/x-www-form-urlencoded 분석할 수 있게 해줌.
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());

const mongoose = require('mongoose');

mongoose.connect(config.mongoURI, {
  useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

  app.get('/', (req, res) => res.send('Hello world!! '))

  // 클라와 연결
  app.get('/api/hello',(req,res)=>{
    res.send('안녕하세요 ~!! 성공');
  })

  app.get('/greet', (req, res) =>
  res.send({ greeting: 'Hello haeun, Be happy :)' })
);

app.post('/api/register', (req, res) => {
  // 회원가입 할 때 필요한 정보들을 client에서 가져오면
  // 그것들을 db에 넣어준다.
  const user = new User(req.body)
  // 이 사이에서 비번 암호화 => bcrypt 과정
  user.save((err, userInfo) => {
    if (err) {
      return res.json({ success: false, err })
    }
    // 성공하면
    return res.status(200).json({
      success: true
    })
  })
})

app.post('/api/login',(req,res) => {
  // 요청된 이메일을 데이터베이스에서 있는지 찾는다.
  User.findOne({email: req.body.email},(err,user) => {
    if(!user){
      return res.json({
        loginSuccess: false,
        message: '제공된 이메일에 해당되는 유저가 없습니다.',
        err
      })
    }
  // 요청된 이메일이 데베에 있다면 비밀번호가 같은지 확인
  user.comparePassword(req.body.password, (err,isMatch) => {
    if(!isMatch)
    return res.json({loginSuccess: false, message: "비밀번호가 틀렸습니다."});

  // 비번까지 맞다면 토큰을 생성하기
    user.generateToken((err,user) => {
      if(err) return res.status(400).send(err);
      
      // 토큰을 저장한다. 어디에? 쿠키/로컬스토리지 등등...
      res.cookie("x_auth",user.token)
      .status(200)
      .json({loginSuccess: true, userId: user._id})

    })
  })

  })

})

// auth => 미들웨어
// 엔드포인트(링크)에서 req 받은다음에 콜백펑션하기전에 중간에서 해주는거
app.get('/api/auth',auth,(req,res)=>{

  // 여기까지 미들웨어를 통과해왔다는 얘기는 Authentication이 true라는 말.
  res.status(200).json({
    _id: req.user._id, // auth.js에서 req.user=user; 이 작업을 했기때문에 가능.
    isAdmin: req.user.role === 0 ? false : true, // role 0 일반유저 / 0이 아니면 관리자
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
    role: req.user.role,
    image: req.user.image
  })
})

app.get('/api/logout', auth, (req, res) => {
  // console.log('req.user', req.user)
  User.findOneAndUpdate({ _id: req.user._id },
    { token: "" }
    , (err, user) => {
      if (err) return res.json({ success: false, err });
      return res.status(200).send({
        success: true
      })
    })
})

app.listen(port,()=>console.log(`Listening on port ${port}`));
