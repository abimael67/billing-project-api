const mongoose = require('../db/mongoose')
const autoIncrement = require('../db/mongoose-auto-increment')
const BillSchema = new mongoose.Schema({
    bill_number:{
        type:Number,
        required:true
    },
    seller:{
        type:mongoose.Schema.Types.ObjectId, ref:'Seller',
        required:true
    },
    customer:{
        type:mongoose.Schema.Types.ObjectId, ref:'Customer',
        required:true
    },
    date:{
        type:Date,
        default:new Date()
    },
    comment:{
        type:String
    },
    details:[{
        article:{
            type: mongoose.Schema.Types.ObjectId, ref: 'Article',
            required:true
        },
        amount:{
            type:Number,
            required:true
        },
        unit_price:{
            type:Number,
            required:true
        }
    }]
})

BillSchema.plugin(autoIncrement.plugin, {
    model: 'Bill', 
    field: 'bill_number',
    startAt: 1000,
});
const Bill = mongoose.model("Bill", BillSchema)
module.exports = {Bill}