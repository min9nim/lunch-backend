const mongoose = require('mongoose');

// 디비설정 
const db = mongoose.connection;
db.on('error', console.error);
db.once('open', function () {
    console.log("Connected to mongod server");
});


console.log("== argv ==")
console.log(process.argv);

console.log("process.env.NODE_ENV = " + process.env.NODE_ENV);

if (process.env.NODE_ENV) {
    console.log("운영모드");
    const dbConfig = require("../../dbConfig");
    mongoose.connect(dbConfig.lunch);

}else{
    console.log("개발모드");
    const dbConfig = require("../../../dbConfig");
    mongoose.connect(dbConfig.lunch);
}

module.exports = mongoose;
