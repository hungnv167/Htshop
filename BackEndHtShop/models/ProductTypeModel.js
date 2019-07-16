const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProductTypeSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    typeProductImage: {
        type: String,
        required: true
    },
    created_date: {
        type: Date,
        default: Date.now
    }
})
ProductTypeSchema.path('name').set((inputString =>{
    return inputString[0].toUpperCase() + inputString.slice(1)
}))
module.exports = mongoose.model('TypeProducts', ProductTypeSchema)