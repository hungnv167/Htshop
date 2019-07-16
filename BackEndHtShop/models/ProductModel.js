const mongoose = require('mongoose')
const Schema = mongoose.Schema


const ProductSchema = Schema({
    name: {
        type: String,
        required: true
    },
    idType: Schema.ObjectId,
    nameType: {
        type:  String,
    },
    price: {
        type:  Number,
        default: 0,
    },
    color: {
        type: String,
        default: "black"
    },
    material: {
        type: String
    },
    description: {
        type: String,
        default: "Không có mô tả thêm cho sản phẩm này"
    },
    images: {
        type: []
    },
    created_date: {
        type: Date,
        default: Date.now
    }
})
ProductSchema.path('name').set((inputString =>{
    return inputString[0].toUpperCase() + inputString.slice(1)
}))
module.exports = mongoose.model('Products', ProductSchema)