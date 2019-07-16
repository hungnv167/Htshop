const mongoose = require('mongoose')
const Schema = mongoose.Schema

const BillSchema = new Schema({
    idUser: Schema.ObjectId,
    total: {
        type: Number,
        required: true
    },
    note: {
        type: String,
        default:"Cám ơn quuý khách sử dụng dịch vụ của chúng tôi !"
    },
    status: {
        type: String,
        default: "Th shop"
    },
    created_date: {
        type: Date,
        default: Date.now
    }
})
module.exports = mongoose.model('Bills', BillSchema)