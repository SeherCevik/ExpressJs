const express = require("express");
//models i buraya dahil etmeliyiz kayıt işlemlerinin olabilmesi için.
const toDo = require("../models/toDoModels")

const toDoAdd = async (req,res) => {
// fonksiyona başarılı şekilde geliyorsa postmanda post atıldıktan sonra terminalde console.log içerisinde ki ifade yazar: console.log("toDoAdd içerisinde...")
    console.log(req.body); // buraya body geliyor mu diye kontrol etmek için.

    try {
        //eğer bu kayıt varsa hata dönsün kontrolü için;
        //eğer şemadaki(toDo) name ile gönderilen name aynı ise hata mesajı döndüreceğiz
        const _todo= await toDo.findOne({name: req.body.name})

        if(_todo){
            return res.status(400).json({
                success: false,
                message: "bu isimde kayıt mevcut"
            })
        }


        //toDoAdd  şemada tanımladığımız alanları ve body de tanımladığımız alanları alarak veritabanına kaydetmeye çalışıyoruz.
        const toDoAdd = new toDo(req.body)

        //veritabanına kaydet (save)
        await toDoAdd.save()
            .then(() => {
                //eğer başarılı bir kayıt olmuşsa kaydettiği değerleri geri dönmesini promise yapısı ile oluşturuyoruz.
                //kayıt işlemi olduğu için 201 yazıyoruz bu başarılı bir işlem olduğunu gösterir.
                //geri dönüşü json formatında yapıyoruz.
                return res.status(201).json(toDoAdd);
            })
            //kayıt ederken bir hata çıkmışsa bunu da geri dönmesi için buraya da bir catch koyarız.
            .catch((err) => {
                return res.status(400).json({
                    success : false,
                    message : "kayıt oluşturulurken hata çıktı : " + err
                })
            })
    } catch (error)
    {
        return res.status(500).json({
            success : false,
            message: " Kayıt oluşturulamadı ! "
        })

    }
}

const todoGetAll = async (req,res) => {
    try {
        const todoGetAll = await toDo.find({})
        return res.status(200).json({
            success: true,
            data: todoGetAll
        })
    }catch(error){
        return res.status(500).json({
            success: false,
            message: "Kayıt getirilemedi !"
        })
    }

}

const todoUpdate = async (req,res) => {
        const {id} = req.params
    try {

        const todoUpdate = await toDo.findByIdAndUpdate(id ,req.body)
        if(todoUpdate)
        {
            return res.status(200).json({
                success:true,
                message:"güncelleme başarılı :)"
            })

        }
        else {
            //kayıt güncellenemeyebilir.
            return res.status(400).json({
                success:false,
                message:"kayıt güncellenemesi hata 400 kodu !"
            })
        }
    }catch (error)
    {
        return res.status(500).json({
            success:false,
            message:"kayıt güncellenemedi"
        })
    }
}

const todoGet = async (req,res) => {
    const {id}= req.params;

    const todoGet = await toDo.findById(id)
    if(todoGet){
        return res.status(200).json(
            //kaydı döneceği için
            todoGet
        )
    }
    else {
        return res.status(400).json({
            success:false,
            message:"kayıt getiirilemedi :("
        })
    }
}

const todoDelete = async (req ,res) =>{
        const {id} = req.params;
        //req.params.id;
    try {
        const todoDelete = await toDo.findByIdAndDelete(id)
        if(todoDelete)
        {
            return res.status(200).json({
                success:true,
                message:"silme işlemi başarılı :)"
            })
        }
        else {
            return res.status(400).json({
                succes:false,
                message:"silme işlemi yapılamadı :("
            })
        }
    }catch (error)
    {
        return res.status(500).json({
            success:false,
            message:"sunucu kaynaklı hata !" + error
    })
    }

}


module.exports = {
    toDoAdd,
    todoGetAll,
    todoUpdate,
    todoDelete,
    todoGet

}