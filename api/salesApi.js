const express = require('express');
const router = express.Router();
const dbConn = require('../mariaDBConn');



//[admin]
// [ 금월, 전월(해당매장)  1)MarkerClick  2)admin Side Select ]
router.post("/salesTwoMonthStore", (req, res) => {
  
let store = req.body.name;
const sql = `select          
                extract(month from sa.date) as month, sum(price) as total_sales 
             from 
                sales as sa inner join product pr on sa.productId = pr.productId 
                inner join store as st on sa.storeId = st.storeId 
              where 
                st.name = ?
              and 
                sa.date >= date_add(now(), interval -2 month) 
              group by 
                extract(month from sa.date) 
              order by 
                month desc`;
    // db select문 수행
    dbConn((err, connection) => {
      connection.query( sql, store, (err, rows) => {
        connection.release(); // 연결세션 반환.
        if (err) {
          throw err;
        }
        return res.send( rows ); // 결과는 rows에 담아 전송  [{"3":"10000"},{"2":"20000"}]
      });
      if(err) throw err;
    });
  });


  // [mapMarker클릭 / Owner Side Default]- [누적매출(해당매장)]
  // [mapMarker클릭 ]- [누적매출(해당매장)]
  router.post("/totalSalesStore", (req, res) => {
  
  let store = req.body.name;
  const sql = `select 
                  sum(pr.price) as sum
               from 
                  sales as sa inner join product pr on sa.productId = pr.productId 
                  inner join store as st on sa.storeId = st.storeId
                where st.name = ?`;
      // db select문 수행
      dbConn((err, connection) => {
        connection.query( sql, store, (err, rows) => {
          connection.release(); // 연결세션 반환.
          if (err) {
            throw err;
          }
          return res.send( rows ); // 결과는 rows에 담아 전송
        });
        if(err) throw err;
      });
    });


  // [ mapMarker 클릭) [drink/food/goods] 별 총매출액(해당매장, 금월) ]
  router.post("/categorySalesStroe", (req, res) => {
  
  let store = req.body.name;
  const sql = `select 
                  pr.category,  sum(pr.price) as price
              from 
                  sales as sa inner join product pr on sa.productId = pr.productId
                  inner join store as st on sa.storeId = st.storeId
              where 
                  st.name = ?
              and 
                  month(sa.date)= month(now())
              group by 
                  pr.category
              `;
      // db select문 수행
      dbConn((err, connection) => {
        connection.query( sql, store, (err, rows) => {
          connection.release(); // 연결세션 반환.
          if (err) {
            throw err;
          }
          return res.send( rows ); // 결과는 rows에 담아 전송
        });
        if(err) throw err;
      });
    });




//  [금월, 전월]-[Admin Select Side]
router.post("/salesSelect", (req, res) => {
  const sql = `select 
                  extract(month from date) as month, 
                  sum(price) as total_sales
               from 
                  sales as s inner join product as p on s.productId = p.productId
               where
                   s.date >= date_add(now(), interval -2 month)
               group by 
                    extract(month from s.date)`;
      // db select문 수행
      dbConn((err, connection) => {
        connection.query( sql, (err, rows) => {
          connection.release(); // 연결세션 반환.
          if (err) {
            throw err;
          }
          return res.send( rows ); // 결과는 rows에 담아 전송 
        });
        if(err) throw err;
      });
    });



//  [누적매출]-[Admin Select Side]
router.post("/totalSales", (req, res) => {
  const sql = `select 
                  sum(p.price) as sum
                from 
                  sales as s inner join product as p on s.productId = p.productId
              `;
      // db select문 수행
      dbConn((err, connection) => {
        connection.query( sql, (err, rows) => {
          connection.release(); // 연결세션 반환.
          if (err) {
            throw err;
          }
          return res.send( rows ); // 결과는 rows에 담아 전송
        });
        if(err) throw err;
      });
    });





//[owner] 
// 누적매출(/totalSalesStore) - (윗부분, id매장)
// [Side Select Default ]
router.post("/totalSalesConstantStore", (req, res) => {   

  const storeName = req.user.storeName;  
  const sql = `select 
                  sum(pr.price) as sum
               from 
                  sales as sa inner join product pr on sa.productId = pr.productId 
                  inner join store as st on sa.storeId = st.storeId
                where 
                  st.name = ?`;
      // db select문 수행
      dbConn((err, connection) => {
        connection.query( sql, storeName, (err, rows) => {
          connection.release(); // 연결세션 반환.
          if (err) {
            throw err;
          }
          return res.send( rows ); // 결과는 rows에 담아 전송
        });
        if(err) throw err;
      });
    });


// [ Owner Select Option 월별 총 매출액- id매장]
router.post("/totalSalesMonthStroe", (req, res) => {

  const params = [ req.user.storeName, req.body.month];
  const sql = `select 
                    sum(pr.price) as sum
               from 
                    sales as sa inner join product pr on sa.productId = pr.productId
               inner join 
                    store as st on sa.storeId = st.storeId
               where 
                    st.name = ?
               and 
                    month(sa.date) = ? 
              ;`;
      // db select문 수행
      dbConn((err, connection) => { 
        connection.query( sql, params, (err, rows) => {
          connection.release(); // 연결세션 반환.
          if (err) {
            throw err;
          }
          return res.send( rows ); // 결과는 rows에 담아 전송
        });
        if(err) throw err;
      });
    });




// [ Owner Chart 전체월 / drink 총매출액(id매장) ]
router.post("/drinkSalesYearStore", (req, res) => {
  
  const storeName = req.user.storeName;
  const sql = `select 
                   extract(month from sa.date) as name, sum(price) as price
                from 
                   sales as sa inner join product pr on sa.productId = pr.productId 
                   inner join store as st on sa.storeId = st.storeId
                where
                   st.name = ?
                and 
                  pr.category = 0
                group by 
                  extract(month from sa.date);`;
      // db select문 수행
      dbConn((err, connection) => {
        connection.query( sql, storeName, (err, rows) => {
          connection.release(); // 연결세션 반환.
          if (err) {
            throw err;
          }
          return res.send( rows ); // 결과는 rows에 담아 전송
        });
        if(err) throw err;
      });
    });

// [ Owner Chart 전체월 / food 총매출액(id매장) ]
router.post("/foodSalesYearStore", (req, res) => {  

  const storeName = req.user.storeName;
  const sql = `select 
                   extract(month from sa.date) as name, sum(price) as price
                from 
                   sales as sa inner join product pr on sa.productId = pr.productId 
                   inner join store as st on sa.storeId = st.storeId
                where
                   st.name = ?
                and 
                  pr.category = 1
                group by 
                  extract(month from sa.date);`;
      // db select문 수행
      dbConn((err, connection) => {
        connection.query( sql, storeName, (err, rows) => {
          connection.release(); // 연결세션 반환.
          if (err) {
            throw err;
          }
          return res.send( rows ); // 결과는 rows에 담아 전송
        });
        if(err) throw err;
      });
    });

// [ Owner Chart 전체월 / goods 총매출액(id매장) ]
router.post("/goodsSalesYearStore", (req, res) => { 

  const storeName = req.user.storeName;
  const sql = `select 
                   extract(month from sa.date) as name, sum(price) as price
                from 
                   sales as sa inner join product pr on sa.productId = pr.productId 
                   inner join store as st on sa.storeId = st.storeId
                where
                   st.name = ?
                and 
                  pr.category = 2
                group by 
                  extract(month from sa.date);`;
      // db select문 수행
      dbConn((err, connection) => {
        connection.query( sql, storeName, (err, rows) => {
          connection.release(); // 연결세션 반환.
          if (err) {
            throw err;
          }
          return res.send( rows ); // 결과는 rows에 담아 전송
        });
        if(err) throw err;
      });
    });


    
// [ Owner Chart 전체월 /  월별 총매출액(id매장) ]
router.post("/totalSalesYearStore", (req, res) => { 

  const storeName = req.user.storeName;
  const sql = `select 
                    extract(month from sa.date) as month, 
                    sum(price) as price
               from 
                   sales as sa inner join product pr on sa.productId = pr.productId 
               inner join 
                   store as st on sa.storeId = st.storeId
               where 
                   st.name = ?
               group by 
                    extract(month from sa.date);`;
      dbConn((err, connection) => {
        connection.query( sql, storeName, (err, rows) => {
          connection.release(); // 연결세션 반환.
          if (err) {
            throw err;
          }
          return res.send( rows ); // 결과는 rows에 담아 전송
        });
        if(err) throw err;
      });
    });


module.exports = router;