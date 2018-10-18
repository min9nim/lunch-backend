const express = require("express");
const bodyParser = require('body-parser');
const morgan = require('morgan');
const router = require('./router');



// 익스프레스 앱생성
const app = express();


// 미들웨어 등록
app.use(morgan('combined'));    // 서버 access 로그
app.use(bodyParser.json());


 // 정적리소스 서비스
const staticPath = process.platform.indexOf("win32") > -1
                   ? __dirname + '\\..\\public' 
                   : __dirname + '/../public' ;
app.use(express.static(staticPath));


// RESTful API 라우터 등록
app.use('/api', router);


// 윈도우환경에서는 뒤에 공백문자가 들어가기 때문에 공백제거 필요함
process.env.NODE_ENV = process.env.NODE_ENV && process.env.NODE_ENV.trim();

// 서비스 포트
//const PORT = process.env.NODE_ENV === "development" ? 8080 : process.env.PORT;
const PORT = 5050;


// HTTP 서비스 시작
app.listen(PORT, function(){
    console.log(`express is listening on port ${PORT}`);
});
