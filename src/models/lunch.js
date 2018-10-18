const mongoose = require("./dbConnect");

const Schema = mongoose.Schema;
const lunchSchema = new Schema({
    seq: {type: String, unique: true, required: true},      // 간단히 auto_increment 설정으로 처리할 수 있는게 있는지 모르겠다.
    menu: String,
    restaurant: String,
    locatoin: String,
    etc: String,
    lastVisited: String
});


module.exports = mongoose.model('Lunch', lunchSchema, "lunchs");
