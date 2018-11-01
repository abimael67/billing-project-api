const mongoose = require('../db/mongoose')

const ArticleSchema = new mongoose.Schema({
    description:{
        type:String,
        required:true
    },
    unit_price:{
        type:Number,
        required:true
    },
    status:{
        type:String,
        enum:["Active", "Inactive"],
        default:'Active',
        required:true
    }
})
const Article = mongoose.model("Article", ArticleSchema)
module.exports = {Article}