var express = require('express');
const mongoose = require('mongoose')
var router = express.Router();
const cors = require('cors')
const User = require('../models/UserModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
router.use(cors())

/* GET users listing. */
process.env.SECRET_KEY = 'lovetien'
router.post('/register',(req, res, next) =>{
  const newUser = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    password: req.body.password,
    phone: req.body.phone,
    address: req.body.address
  }
  User.findOne({email: req.body.email})
    .then(user =>{
      if(!user){
        bcrypt.hash(req.body.password, 10, (err, hash) =>{
          newUser.password = hash
          User.create(newUser)
            .then(user =>{
              res.json({status: user.email+ ' registered !'})
            })
            .catch(err=>{
              res.send('err'+ err)
            })
        })
      }
      else{
        res.json({status: 'User already exists'})
      }
    })
    .catch(err =>{
      res.send('err'+ err)
    })
})
router.post('/login', (req,res, next) =>{
  User.findOne({email: req.body.email})
  .then(user =>{
    if(user){
      if(bcrypt.compareSync(req.body.password,user.password)){
        const payload = {
          _id: user._id,
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email
        }
        let token = jwt.sign(payload, process.env.SECRET_KEY, {
          expiresIn: 1440
        })
        res.send(token)
      }
      else{
        res.json({error: 'Password error'})
      }
    }
    else{
      res.json({error: 'User does not  exist'})
    }
  })
  .catch(err =>{
    res.json({error : err})
  })
})

// router.get('/profile',(req,res, next) =>{
//   var decoded = jwt.verify(req.headers['authorization'],process.env.SECRET_KEY)
//   User.findOne({
//     _id: decoded._id
//   })
//   .then(user =>{
//     if(user){
//       res.json(user)
//     }
//     else{
//       res.send('TH Shop wellcome !')
//     }
//   })
//   .catch(err=> res.send('err'+ err))
// })
module.exports = router;
