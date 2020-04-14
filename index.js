//모듈 호출
const express = require("express");
const morgan = require("morgan");
const app = express();

//라우터 호출
const homeRouter = require('./routes/home');
const userRouter = require('./routes/user');
const boardRouter = require('./routes/board');



//미들웨어 등록 (서버 시작점의 미들웨어: 어떤 경로던 간에 모두 실행이 된다.)
// 바디 파싱
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(morgan('dev'));








//라우터 등록
app.use('/',homeRouter);
app.use('/user',userRouter);
app.use('/board',boardRouter);
app.use((req,res,next)=>{res.json({message: 'Not found'}).status(404);}); //어떤경우에도 실행 (미들웨어)


















// 서버시작
app.listen(3333,function(err){
    if(err){
        console.error(err.message);
        throw err;
    }

    console.log("server start 3333 port");
})