/**
 * 유저 관련 경로
 * uri : /add , /delete ,  /list , /update, /detail
 */

const router = require("express").Router();
const getConn = require('../config/database/connect');
const format = require('mysql').format;
// http method (string, ...function)
router.post('/add',(req,res,next)=>{
    const {content, title, writer} = req.body;

    if(!(content && title && writer)){
        return res.status(400).json({success: false, message:'빈칸 없이 입력해주세요.'}); 
    }

    try{
        const sql = 'insert into board (content,title,writer) values (?,?,?)';
        const q = format(sql ,[content,title,writer]);

        getConn((err,conn) =>{
            if(err){
                return res.status(500).json({success : false, message : err.message});
            }
            

     conn.query(q, (err,board1)=>{
                if(err){
                   res.status(500).json({success : false, message : err.message});
                }
                else {
                    
                    res.status(201).json({success : true, message : "게시판 등록 성공", data : board1[0]});

                }  
                
            })
            
            conn.release(); // 커넥션풀 반납
        });
    }catch{
        console.log('catch');
        return res.status(500).json({success: false, message: '에러'});

    }finally{
        console.log('게시글 등록 api 종료');
    }
});


router.delete('/delete',(err,req,res,next)=>{});
router.get('/list',(req,res,next)=>{
    const{id} = req.query;
    
    const sql = 'select title,writer from board where id = ?';
    const q = format(sql,[id]);

    getConn((err,conn) =>{
        if(err){
            return res.status(500).json({success : false, message : err.message});
        }
        

 conn.query(q, (err,rows)=>{
            if(err){
               res.status(500).json({success : false, message : err.message});
            }
            else {
                res.status(201).json({success : true, message : "게시판 목록 보여지기 성공", data : rows[0]});

            }  
            
        })
        
        conn.release(); // 커넥션풀 반납
    });
    

});


router.put('/update',(req,res,next)=>{});
router.get('/detail',(req,res,next)=>{});
// export {router};

module.exports = router; // router을 밖으로 뺀다.