//kayıt işlemlerini burada yapacağız.

//mongoose paketini dahil edelim
const mongoose = require("mongoose");
const {mongo} = require("mongoose");
//ilk schema mızı oluşturmak için;

const todoSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true
    },
    description:{
        type: String,
        required: true,
        trim: true
    },
    complated:{
        type: Boolean,
        default: false
    }
},{collection: "Todo", timestamps : true})

//Şemanın (schema) adı (todo)
const todo = mongoose.model("Todo",todoSchema)

//dışarıya açmak için
module.exports = todo