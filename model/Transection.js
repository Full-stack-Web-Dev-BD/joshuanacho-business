const mongoose=require('mongoose')
const Schema=mongoose.Schema

const TransectionSchema=new Schema({
    insertDate:Date,
    product:String,
    brand:String,
    category:String,
    description:String,
    rating:String,
    sellerInformation:String,
    currentPrice:Number,
    currentPriceDate:String,
    oldPrice:Number,
    oldPriceDate:String,
    priceChange:Number,
    url:String,
})



const Transection=mongoose.model('Transection',TransectionSchema)
module.exports =Transection