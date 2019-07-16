const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
    first_name:{
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type:Number
    },
    address: {
        type: String
    },
    created_date: {
        type: Date,
        default: Date.now
    }
})
UserSchema.path('first_name').set((inputString =>{
    return inputString[0].toUpperCase() + inputString.slice(1)
}))
UserSchema.path('last_name').set((inputString =>{
    return inputString[0].toUpperCase() + inputString.slice(1)
}))
module.exports = mongoose.model('Users', UserSchema)