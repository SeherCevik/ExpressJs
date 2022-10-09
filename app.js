//express paketini projeye dahil edelim
const express = require("express");
const app = express();
//env dosyası için dotenv i projeye dahil edelim
//const env= require("dotenv");
require("dotenv").config();
require("./src/config/databaseConnection");

//port numarası oluşturmak için
const PORT = process.env.PORT || 5001;
//router dosyasını dahil etme
const toDoRouter = require("./src/router/toDoRouter")


//post metodu içerisinde ki body lerin okunabilmesi için gerekir.
app.use(express.json());


app.use("/api",toDoRouter);

//api için kısa bir anasayfa oluşturma;
app.get("/",(req ,res) => {
    res.send("welcome...");
})


//sunucuyu başlatmak için listen parametre olarak port numarası alır.
app.listen(PORT, ()=> {
    console.log(`server ${PORT} portundan çalışmaya başlatıldı...`)
})