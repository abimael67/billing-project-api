const mongoose = require('../db/mongoose')

const CustomerSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    identification:{
        type:String,
        required:true
    },
    account:{
        type:String,
        required:true
    },
    status:{
        type:String,
        enum:["Active", "Inactive"],
        required:true,
        default:'Active',
    }
})
const Customer = mongoose.model("Customer", CustomerSchema)
module.exports = {Customer}