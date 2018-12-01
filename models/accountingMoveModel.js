const mongoose = require('../db/mongoose')

const AccountingMoveSchema = new mongoose.Schema({
   
    description:{
        type:String,
        required:true
    },
    aux:{
        type:Number,
        required:true
    },
    date:{
        type:Date,
        required:true,
        default: Date.now()
    },
    status:{
        type:String,
        enum:["R", "I"],
        default:'R',
        required:true
    },
    details:[{
        account:{
            type: Number,
            required:true
        },
        customer:{
            type:String, 
            required:true
        },
        seller:{
            type:String,
            required:true
        },
        moveType:{
            type:String,
            required:true,
            enum:["CR", "DB"],
            default:"CR"
        },
        total:{
            type:Number,
            required:true
        }
    }]
})
const AccountingMove = mongoose.model("AccountingMove", AccountingMoveSchema)
module.exports = {AccountingMove}