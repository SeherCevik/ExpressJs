//express in fonksiyonu olan router ı bu şekil de alabiliriz.
const router =  require("express").Router();
const toDoController = require("../controller/toDoController")
//toDoController içerisinde ki todoAdd fonksiyonunu çağırdık. Başarılı olup olmadığını postman den kontrol edebilirz.
router.post("/todo",toDoController.toDoAdd)

//tüm kayıtları getiren işlemler için;
router.get("/todo",toDoController.todoGetAll)

router.put("/todo/:id", toDoController.todoUpdate);

router.delete("/todo/:id", toDoController.todoDelete);

router.get("/todo/:id", toDoController.todoGet)

//router ı dışarı açmak için ;
module.exports = router;