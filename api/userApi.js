const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const passport = require('passport');
      require('../passport/index')(passport);
const flash = require('connect-flash');
const dbConn = require('../mariaDBConn');


/*
 위 코드 대신 커스텀 콜백을 사용(ajax라서 json응답을 줘야하기 때문에)

 authenticate('local',) 하면 => passport/local.js를 실행
 여기서 local은 사용자의 아이디, 비밀번호를 사용해 로그인인증을 하는것을 의미한다. 
 (만약, kakao나 다른 서비스를 이용하여 로그인 인증을 하게 되면 local 대신 다른 값으로 바뀐다.)
*/
router.post('/login', (req, res, next) => {                                      // saga에서 요청 들어옴 req는 loginData가 들어와야함.
  
   
  passport.authenticate('local', (err, user, info) => {                          // local.js에서 db매칭 성공 시의 done에서 온다.
    console.log('passport authenticate접근'+JSON.stringify(user));                // DB user
    console.log('massgae'+JSON.stringify(info));                                 // DB 매칭에서 에러시 에러 massage
    if (info) {                                                                  // info로 들어온 플래시 메세지 처리
            req.flash('error')
             req.session.flash.error = info.message;
             console.log('error info'+JSON.stringify(req.session)); 
            // (에러) res.redirect('/adminHome')                                         // 여기서 res.~~를 하면, if(!user)에서 res.~와 중복으로 에러난다. 
    }                                   
    if(err) { res.status(500).json(err); } 
    if(!user) { console.log('userApi passport authenticate 유저없음');  
                console.log(JSON.stringify(req.session));          // local에서 user매칭이 틀리면(비번틀림,회원아님) 이리로 들어온다.
                // res.json(info.message)                                       // 하면, 아래 redirect로 안가고, api/login으로 넘어간다. 
                return  res.redirect('/adminHome');                              // redirect를 사용하면, 3000포트(client)를 사용한다
                // return  res.redirect('/login');                                 
                //return res.status(401).json( { success : false, message : info.message } )     // info.message는 local에서 error시 정의했던 message내용
              }
                    
    req.login(user, (err) => {                                // => serialize로 이동  
        console.log('req.login진입 - 입력user === dbuser와 매칭 맞은 상태')
        if(err) {   
            console.log('userApi req.login Error'+err);
            console.log('req.login Error session확인'+JSON.stringify(req.session));
            return res.json({ Success : false, message : 'req.json 실패입니다.' }) 
               
        } 
        return res.redirect('/ownerHome')      
      }); 
    })(req, res, next);          // authenticate 반환 메서드에 이 인자를 넣어서 처리해야한다. 
    // return res.redirect('/ownerHome')   
    // res.json(user);
    /* 
      (주의!)
      구조 : authenticate -> LocalStrategy -> serialize(session생성) ->  desrialize(sessoin에 user저장)에서 req.user를 -> req.login실행으로 들어와 -> return res.json(user)로 client에 응답
      주의 : 
      1) LocalStrategy에서 dbuser를 const 객체를 가져와 사용 시 
          ->  여기서 return redirect를 해줘야 한다.  거기서 진행하면 req.login가 이상하게 다시한번 실행됨.
      2) LocalStrategy에서 dbuser를 dbConn(DB연결) 해 사용 시 
          -> req.login 내부(마지막)에서 return redirect를 해야한다.
             여기서 하면 deserialize가 실행안됨(즉, user가 session에 저장안됨) 
             참고) session.passport.user(deserialize done실행)에 저장된 것은, 외부에서 
                  req.user로 꺼내 사용할 수 있다!!!
      

       */
});                                          

            
     
       
   
router.post('/user', (req, res) => {                          // (주의) client에서 요청시 접근
    console.log('get login'+JSON.stringify(req.user));      // session에 저장된 값   
    // res.json(req.user);      
    if(!req.user) {     
      res.redirect('/adminHome');
    }
    else { 
      return res.json(req.user)
      // return res.redirect('/ownerHome');
    }     
});   


router.get('/loginError', (req, res) => {                          // (주의) client에서 요청시 접근
    console.log('get loginError'+JSON.stringify(req.session.flash));      // session에 저장된 값   
    const massage = req.session.flash;    
    if(massage) {
      return res.json(massage)     
      // return res.send(massage)       
    }
    // else { 
      // return res.send('없음')
    // }     
});   



      
router.get('/logout', (req, res)=> {              // post /api/logout
  req.logout();                                   // 하면 로그아웃 되면 세션도 끊어준다. 
  req.session.destroy(function(err){               // 세션을 지우는 방법.
    res.send({succ : true})
    // res.redirect('/adminHome');
  });
  // req.session.save(function(){  // 현재의 세션 상태를 저장하고, redirect
  //   res.redirect('/login');
  // })
});
     


               

// [회원가입]-[이메일 중복확인]
router.post("/existEmail", (req, res) => {   
  
  let email = req.body.email;
  dbConn((err, connection) => { 
    connection.query("SELECT ownerId FROM owner where ownerId = ?;", email, (err, rows) => {
      connection.release(); // 연결세션 반환.
      if (err) {
        throw err;
      }
      if(!rows.length){       // 존재하지 않는 아이디 -> 회원가입 가능
        return res.send({ succ : true, massage : "가능"});
      }else{ 
        return res.send({ succ : false, massage : "이미존재하는 아이디입니다."});
      }
      // return exist;
    });
    if(err) throw err;
  });
});



// [회원가입 Submit]
// [Register 전체 매장명 선택]
router.post('/register', (req, res) => {

  const sql = `insert into 
                    owner(storeId, ownerId, name, password, phone)
                values 
                    (?, ?, ?, ?, ?);    
               `;  
  const params = [req.body.storeId, req.body.email, req.body.username, req.body.password, req.body.phone];
               //  (4,'ddd@ddd.com','김올올', 'test01#', '010-000-0000');
  dbConn((err, connection) => {      
    connection.query( sql, params, (err, rows) => {
      connection.release(); // 연결세션 반환.
      if (err) {
        throw err;
      }  
      return res.send({succ : true}); 
    });
    if(err) throw err;
  });
})

module.exports = router;



/*
* saga + passport 이용 시 
saga에서 withCredentials처리 
앞서 saga에서 withCredentials 가지고 왔기 때문에 passport에 deserializeUser 통과한다.
그러나 쿠키가 없기 때문에 별일 없이 통과는 하는데
req.user는 값이 없게 된다.
그 다음 req.login을 하게 되면 우리가 만들어 놓은 passport local 로그인 전략을 사용하게 된다. 
*/