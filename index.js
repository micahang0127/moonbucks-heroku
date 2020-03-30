const express = require('express');
const path = require('path');
const app = express();
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const cookieParser = require('cookie-parser');
// const expressSession = require('express-session');
// const passport = require('passport');               // 에러) Unkown authentication strategy "local"   
// // require('./passport/index')(passport);           // -> 위 에러 해결방안.
// const dotenv = require('dotenv');                   // 해야 session secet을 인식해 값을 넣을 수 있다
// const flash = require('connect-flash');             // 에러 메시지를 redirect 하는 과정에서 쉽게 전달해주는 모듈
// const user = require('./api/userApi');
// const sales = require('./api/salesApi');
// const rank = require('./api/rankApi');
// const store = require('./api/storeApi');





app.use(express.static(path.join(__dirname, 'client/build')));

// Put all API endpoints under '/api'
app.get('/api/test', (req, res) => {
  
  res.json({"passwords": "123"});

});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port , () => console.log(`port는 ${port}`));



