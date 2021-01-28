const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10
const jwt = require('jsonwebtoken');

var userSchema = mongoose.Schema({
  name: {
    type: String,
    maxlength: 50
  },
  email: {
    type: String,
    trim:true,
    require: true,
    index: true,
    unique: true,
    sparse:true
  },
  password: {
    type: String,
    minlength: 5
  },
  lastname: {
    type: String,
    maxlength: 50
  },
  role: {
    type: Number,
    default: 0
  },
  image: String,
  token: {
    type: String
  },
  tokenExp: {
    type: Number
  }
})

// user정보를 저장하기 전에 하는 것
userSchema.pre('save', function (next) {

  // this = 위의 userSchema
  var user = this;

  // 다른 정보가 아닌 'password' 변경 시에만 이 과정을 거친다!!
  if (user.isModified('password')) {
    // 비밀번호를 암호화 시킨다.(bcrypt)
    // salt 생성
    bcrypt.genSalt(saltRounds, (err, salt) => {
      // next 하면 index.js 에서의 user.save로 바로 들어간다.
      if (err) return next(err);

      bcrypt.hash(user.password, salt, (err, hash) => {
        // hash 변수 => 암호화된 비밀번호
        if (err) return next(err);
        // 성공시 hash된 비번으로 바꿔준다.
        user.password = hash;
        next();

      })
    })
  } else {
    next();
  }
})

userSchema.methods.comparePassword = function (plainPassword, cb) {
  // plainPassword 1234567 를 암호화 한후 db에 있는 암호화된 비밀번호와 같은지 확인
  bcrypt.compare(plainPassword, this.password, function (err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch)
  })
}

userSchema.methods.generateToken = function(cb) {
  // json web token을 이용해서 토큰을 생성하기
  // ES5 문법 사용중...
  var user = this;

  var token = jwt.sign(user._id.toHexString(),'secretToken');

  // user._id + 'secretToken' = token 
  user.token = token;
  user.save((err,user)=>{
    if(err) return cb(err);
    // save가 잘되었으면 에러는 없고, user정보만 전달해준다.
    cb(null,user)
  })
}

userSchema.statics.findByToken = (token,cb) => {
  var user = this;
  // 토큰을 decode한다.(복호화)
  // 복호화하면 유저 아이디가 나온다.
  // user._id + '' = token
  jwt.verify(token,'secretToken',(err,decoded)=>{
    // 유저 아이디를 이용해서 유저를 찾은 다음에
    // 클라이언트에서 가져온 토큰과 db에 보관된 토큰이 일치하는지 확인
    user.findOne({"_id": decoded, "token":token},(err,user)=>{
      if(err) return cb(err);
      cb(null,user);
    })
  })
}
const User = mongoose.model('User', userSchema)

// 다른 곳에서도 사용하게 하려고.
module.exports = { User }