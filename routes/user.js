/**
 * 유저 관련 경로
 * uri : /login , /signup ,  /logout , /withdrawal, /account
 */

 const router = require("express").Router();
 const getConn = require('../config/database/connect');
 const format = require('mysql').format;
 // http method (string, ...function)
 router.post('/login',(req,res,next)=>{
     const {userid,password} = req.body;

     if(!(userid && password)){
        return res.status(400).json({success: false, message:'제대로 입력하세요.'}); 
     }
     
     try {
        const sql = 'select * from user where userid = ?';
        const q = format(sql,[userid]);

        getConn((err,conn) => {
            if(err) {
              return res.status(500).json({success : false, message : err.message});
            }
            conn.query(q, (err,rows)=>{
                if(err){
                   res.status(500).json({success : false, message : err.message});
                }
                else if(password == rows[0].password){
                    res.status(201).json({success : true, message : "데이터 불러오는데 성공", data : rows[0]});

                   
                }  
                
            })
            
            conn.release(); // 커넥션풀 반납
        });
            
    
     } catch (loginError) { 
         console.log('catch');
         return res.status(500).json({success: false, message: loginError.message});
     }
     finally{
         console.log('로그인 api 종료');
     }
 });


 router.post('/signup',(req,res,next)=>{
     const {userid,password,name,email} = req.body;
     if(!(userid && password && name && email && req.body)){
         return res.json({success: false, message:'모두 입력하세요'}).status(400);
     }
     

     try {
        const sql = 'INSERT INTO user (userid,password,name,email) VALUES(?,?,?,?)';
        const q = format(sql,[userid,password,name,email]);

        getConn((err,conn) => {
            if(err) {
                
              return res.status(500).json({success : false, message : err.message});
            }
            conn.query(q, (err,rows)=>{
                if(err){
                   res.status(500).json({success : false, message : err.message});
                }
                else {
                    
                    res.status(201).json({success : true, message : "회원가입 성공", data : rows[0]});

                   
                }  
                
            })
            
            conn.release(); // 커넥션풀 반납
        });
            
    
     } catch (signupError) { 
         console.log('catch');
         return res.status(500).json({success: false, message: signupError.message});
     }
     finally{
         console.log('회원가입 api 종료');
     }
     
 });


 router.post('/logout',(req,res,next)=>{
     res.status(201).send("로그아웃 성공")
 });


 router.delete('/withdrawal',(req,res,next)=>{
    const{id} = req.query;
    console.log(`${id} /delete complete`);
    res.status(201).send(`${id}의 회원탈퇴가 완료되었습니다.`);
 });

 router.get('/account',(req,res,next)=>{
     const{id} = req.query;
     console.log(`${id} /account complete`);
     res.status(201).send(`아이디${id}의 상세정보입니다.`);
 });
// export {router};

 module.exports = router; // router을 밖으로 뺀다.