const express = require('express');
const router = express.Router();
const dbConn = require('../mariaDBConn');



//[admin]-[Map infoWindow]
router.post('/storeAll', (req, res) => {
  dbConn((err, connection) => {
      connection.query("SELECT * FROM store", (err, rows) => {
        connection.release(); // 연결세션 반환.
        if (err) {
          throw err;
        }
        return res.send( rows ); 
      });
      if(err) throw err;
    });
})


//[admin]-[Search side option]
router.post('/storesName', (req, res) => {
  dbConn((err, connection) => {
      connection.query("SELECT name FROM store", (err, rows) => {
        connection.release(); // 연결세션 반환.
        if (err) {
          throw err;
        }
        return res.send( rows ); 
      });
      if(err) throw err;
    });
})

// [Register 전체 매장명 선택]
router.post('/store', (req, res) => {
  
  // [left join] ownerId(ownerTable)가 null인것만(매장과 연결안된 상태) 추출.
  const sql = `SELECT 
                  st.storeId, st.name
               FROM 
                  store as st left join owner as ow on st.storeId = ow.storeId
                where 
                    isnull(ow.ownerId) = 1;
              `;
  dbConn((err, connection) => {
    connection.query( sql, (err, rows) => {
      connection.release(); // 연결세션 반환.
      if (err) {
        throw err;
      }
      return res.send( rows ); 
    });
    if(err) throw err;
  });
})

//[register selected Store]-회원가입 시, 매장 select하면 아래 매장정보(주소, 전화번호) 나타남
router.post('/seletedStore', (req, res) => {

  let store = req.body.name;
  dbConn((err, connection) => { // isnull => null이면 1반환 / null이 아니면 0반환
    connection.query("SELECT storeId, address, phone FROM store where  name = ? ;", store ,(err, rows) => {
      connection.release(); // 연결세션 반환.
      if (err) {
        throw err;
      }
      return res.send( rows ); 
    });
    if(err) throw err;
  });
})



module.exports = router;