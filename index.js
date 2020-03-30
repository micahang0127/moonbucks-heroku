const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
// const cors = require('cors');
// const cookieParser = require('cookie-parser');
// const expressSession = require('express-session');
// const passport = require('passport');               // 에러) Unkown authentication strategy "local"   
// // require('./passport/index')(passport);           // -> 위 에러 해결방안.
const dotenv = require('dotenv');                   // 해야 session secet을 인식해 값을 넣을 수 있다
// const flash = require('connect-flash');             // 에러 메시지를 redirect 하는 과정에서 쉽게 전달해주는 모듈
const user = require('./api/userApi');
const sales = require('./api/salesApi');
const rank = require('./api/rankApi');
const store = require('./api/storeApi');





app.use(express.static(path.join(__dirname, 'client/build')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : true }));
dotenv.config();


/*
cors이란 도메인 또는 포트가 다른 서버의 자원을 요청하면 발생하는 이슈이다.
서버와 클라이언트가 분리되어 있는 앱에서는 cross-origin HTTP 요청을 서버에서 승인해주는 것이 좋다.
*/ 
// app.use(cors()); // 모든 도메인에 접근 허용, cors미들웨어 추가
const corsOptions = {   // 3000포트에만 허용
    origin : 'http://localhost:3000',                 // (!)만약, true의 값이 온다면, 모든 포트에 허용
    credentials: true,                                //  for transition cookie(cors, axios)
};


app.use('/api', user);
app.use('/api', sales);
app.use('/api', rank);
app.use('/api', store);

app.get('/api/test', (req, res) => {
  
  res.json({"passwords": "123"});

});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port , () => console.log(`port는 ${port}`));


/*
로그인 방식 : 세션/쿠키 방식
1. 세션/쿠키 방식에서 처음 인증 시 서버가 세션 아이디 : 쿠키 같이 서버에 저장소에 저장을 해 놓는다.
2. 다음 인증이 필요한 요층이 들어 올 때마다 쿠키를 확인 해 세션아이디를 찾아내서 인증 여부를 확인한다.
3. 인증된 사용자에게 인증된 요청이면 그에 맞는 응답을 준다 
=> 이러한 일련의 작업들을 알아서 잘 해주는 것이 passport다 
* passport 
- 첫 인증을 완료하고 세션/쿠키를 자장하는 작업 :  passport -> serializeUser
- 반대로, 인증이 핑요한 요청이 오면 인증을 확인해서 그에 맞게 응답을 주는 작업 : passport -> deserializeUser

*/


