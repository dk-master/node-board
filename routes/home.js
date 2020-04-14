const router = require("express").Router();

router.get('/',(req,res)=>{
    res.send("<h1>게시판 오신걸 환영합니다<h1>");

})

module.exports = router;