// 라우팅 정의
const express = require('express');
const Lunch = require('./models/lunch');
const shortid = require("shortid");





//const R = require('ramda');
//const $m = require('../com/util');

const router = express.Router();
module.exports = router;

const post = {};
const get = {};


function sendErr(res){
    return err => {
        console.log(err);
        res.status(200).send({
            status: "Fail",
            message: err.toString()
        });
    }
}


// 신규 post 등록
post["/add"] = (req, res) => {
    console.log("received data = " + JSON.stringify(req.body, null, 2));
    var lunch = new Lunch();
    Object.assign(lunch, req.body, {seq : shortid.generate()});

    lunch.save().then(output => {
        res.send({
            status: 'Success',
            message: `lunch(${output.seq}) is saved`,
            output: output
        })
    }).catch(sendErr(res));
}


// 목록 조회
get["/list"] = (req, res) => {
    Lunch.find()
        .then(lunchs => res.send({status: "Success", lunchs : lunchs}))
        .catch(sendErr(res));
}



// key 에 해당하는 lunch 를 remove
post["/remove"] = (req, res) => {
    Lunch.remove({ seq: req.body.seq })
        .then(output => {
            //console.log(output);
            res.send({
                status: "Success",
                message: `post(${req.body.seq}) is removed`,
                output
            });
        })
        .catch(sendErr(res));
};



// 글내용 수정
post["/edit"] = (req, res) => {
    Lunch.findOne({seq: req.body.seq}).then(lunch => {        
        // 신규내용으로 업데이트
        Object.assign(lunch, req.body);
        lunch.save().then(output => {
            //console.log("# afterPost is saved");
            //console.log(output);
            res.send({
                status: "Success",
                message: `lunch@${req.body.key} updated.`,
                output: output
            });
        }).catch(sendErr(res));
    }).catch(sendErr(res));    
}




// 신규
router.post("/add", post["/add"]);


// 수정
router.post("/edit", post["/edit"]);


// 목록조회
router.get("/list", get["/list"]);

// 삭제
router.post("/remove", post["/remove"]);


