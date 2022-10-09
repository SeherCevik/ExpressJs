//bu projede app js dosyasına dahil edilir.
/*const dotenv = require('dotenv');
dotenv.config();*/
//const env= require("dotenv");
//require('dotenv').config();
//const mongoose = require('mongoose');
const {mongoose} = require("mongoose");

const port = process.env.PORT;
const conStr = process.env.MONGO_CONNECTION_STRING;

//connect içine veritabanı yolu yazılır. Bu yol genelde env içinde tutulur.
mongoose.connect(process.env.MONGO_CONNECTION_STRING,{
    //bu obje iki parametre alır. bu parametrelerden sonra veritabanı bağlantısının olması beklenir.
    useNewUrlParser:true,
    //useCreateIndex: true,
    useUnifiedTopology:true
})
    //bağlantının başarılı olup olmadığını kontrol etmek için promise yapısı yazılabilir.
    .then(() => {
        console.log("veritabanına başarıyla bağlandı");
    })
    .catch((err) => {
        console.log("veritabanına bağlanılamadı : " +err);
    })