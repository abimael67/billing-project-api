const mongoose = require('../db/mongoose')

const SellerSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    comission_percent:{
        type:Number,
        required:true
    },
    status:{
        type:String,
        enum:["Active", "Inactive"],
        required:true,
        default:'Active',
    }
})
const Seller = mongoose.model("Seller", SellerSchema)
module.exports = {Seller}