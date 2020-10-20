const mongoose=require('mongoose')
const { schema } = require('./chartPointModel')
const Schema=mongoose.Schema

const TransectionSchema=new Schema({
    
    product:String,
    brand:String,
    category:String,
    description:String,
    rating:String,
    sellerInformation:String,
    currentPrice:Number,
    currentPriceDate:Date,
    oldPrice:Number,
    oldPriceDate:Date,
    priceChange:Number,
    url:String,
})



const Transection=mongoose.model('Transection',TransectionSchema)
module.exports =Transection