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



// 글내용 수정
post["/edit"] = (req, res) => {
    //console.log("received data = " + JSON.stringify(req.body, null, 2));

    Post.findOne({key: req.body.key}).then(post => {
        if(post.uuid !== req.params.uuid || post.origin !== undefined){
            res.send({ status : "Fail", message: "Not authorized" });
            return;
        }

        if(post.title !== req.body.title || post.content !== req.body.content){
            // 제목이나 내용이 변경된 경우에만 기존 내용 백업
            var prevPost = new Post();
            prevPost.origin = post.key;
            prevPost.key = shortid.generate(),
            prevPost.title = post.title;
            prevPost.writer = post.writer;
            prevPost.content = post.content;
            prevPost.date = post.date;
            prevPost.isPrivate = post.isPrivate;
            prevPost.isMarkdown = post.isMarkdown;
            prevPost.hasComment = post.hasComment;
            prevPost.uuid = post.uuid;
            prevPost.viewCnt = post.viewCnt;
            prevPost.context = post.context;                        
            // 근데 여기서 Object.assign 을 사용하면 오류 발생ㅠ
            // https://gist.github.com/min9nim/8f3c3895bf2e41e26921eb1002649306

            prevPost.save().then(output => {
                //console.log("# prevPost is saved");
                //console.log(output);
            })
        }
        
        // 신규내용으로 업데이트
        Object.assign(post, req.body);
        post.save().then(output => {
            //console.log("# afterPost is saved");
            //console.log(output);
            res.send({
                status: "Success",
                message: `post@${req.body.key} updated.`,
                output: maskPost(output)
            });
        }).catch(sendErr(res));
    }).catch(sendErr(res));    
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


// 신규
router.post("/add", post["/add"]);

// 수정
router.post("/edit", post["/edit"]);

// 목록조회
router.get("/list", get["/list"]);

// 삭제
router.post("/remove", post["/remove"]);


