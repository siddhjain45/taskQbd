const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/taskQuad",() => {
    console.log("Database connected successful");
})
const dataSchema = mongoose.Schema({
    name:String,
    last:Number,
    buy:Number,
    sell:Number,
    volume:Number,
    basuUnit:String

})
module.exports = mongoose.model("data",dataSchema);
