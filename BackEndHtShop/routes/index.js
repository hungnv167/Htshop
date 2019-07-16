var express = require('express');
var router = express.Router();
const cors = require('cors')
const mongoose = require('mongoose')
const User = require('../models/UserModel')
const TypeProduct = require('../models/ProductTypeModel')
const Product = require('../models/ProductModel')
const Bill = require('../models/BillModel')

router.use(cors())

/* GET All Typroduct */
router.get('/list_all_typeproduct', function(req, res, next) {
  TypeProduct.find({}).limit(100).sort({ name : 1}).select({
    name: 1,
    typeProductImage: 1,
    created_date: 1
  }).exec((err, type) =>{
    if(err){
      res.json({
        result: "failed",
        data: [],
        message: `Err: ${err}`
      })
    }else {
      res.json({
        result: "ok",
        data: type,
        message: "Query list of typeproduct successfully"
      })
    }
  })  
});
/* Insert new type category */
router.post('/insert_new_typeproduct', (req, res, next) =>{
  const newType = new TypeProduct({
    name: req.body.name,
    typeProductImage: req.body.typeProductImage
  })
  newType.save((err) =>{
    if(err){
      res.json({
        result: "failed",
        data: {},
        message: `Err: ${err}`
      })
    }else {
      res.json({
        result: "ok",
        data: {
          name: req.body.name,
          typeProductImage: req.body.typeProductImage
        },
        message: "Insert new type product successfully"
      })
    }
  })
})
// Insert new Product


router.post('/insert_new_product', (req,res, next) =>{
  const newProduct = new Product({
    name: req.body.name,
    idType: mongoose.Types.ObjectId(req.body.idType),
    nameType: req.body.nameType,
    price: req.body.price,
    color: req.body.color,
    material: req.body.material,
    description: req.body.description,
  })
  newProduct.save((err) =>{
    if(err){
      res.json({
        result: "failed",
        data: {},
        message: `Err: ${err}`
      })
    }else {
      res.json({
        result: "ok",
        data: {
          name: req.body.name,
          nameType: req.body.nameType,
          price: req.body.price,
          color: req.body.color,
          material: req.body.material,
          description: req.body.description,
        },
        message: "Insert new type product successfully"
      })
    }
  })
})

router.get('/get_all_product', (req,res , next) =>{
  Product.find({}).limit(100).sort({ name : 1}).select({
          name: 1,
          nameType: 1,
          price: 1,
          color: 1,
          material: 1,
          description: 1,
          images: 1,
          idType: 1
  }).exec((err, type) =>{
    if(err){
      res.json({
        result: "failed",
        data: [],
        message: `Err: ${err}`
      })
    }else {
      res.json({
        result: "ok",
        data: type,
        message: "Query list of typeproduct successfully"
      })
    }
  })  
})


//serach 

router.get('/list_product_with_criteria', (req, res, next)=>{
  if(!req.query.name){
    res.json({
      result: "failed",
      message: "Input parameters is wrong!. 'name' must be NULL"
    })
  }
  let criteria = {
    name: new RegExp(req.query.name,"i")
  }
  const limit = parseInt(req.query.limit) > 0 ? parseInt(req.query.limit) : 100
  Product.find(criteria).limit(limit).sort({name: 1}).select({
    name: 1,
    nameType: 1,
    price: 1,
    color: 1,
    material: 1,
    description: 1,
    images: 1,
    idType: 1
  }).exec((err, item) => {
    if(err){
      res.json({
        result: "failed",
        message: `error: ${err}`
      })
    }
    else{
      res.json({
        result: "ok",
        data: item,
        count : item.length,
        message: "Query list of product successfully"
      })
    }
  })
})


router.post('/checkout', (req, res, next) =>{
  const newBill = new Bill({
    idUser: mongoose.Types.ObjectId(req.body.idUser),
    total: req.body.total
  })
  User.findById({_id: mongoose.Types.ObjectId(req.body.idUser)})
    .then(user =>{
      if(user){
        Bill.create(newBill)
          .then(bill =>{
            res.json({
              result: "ok",
              status: "checkout thanh cong",
              data: bill
            })
          })
          .catch(err =>res.send('err '+ err))
      }
      else{
        res.json({
          result:"failed",
          status: "Chua dang nhap",
          data: []
        })
      }
    })
    .catch(err => res.send('err '+err))
})
module.exports = router;
