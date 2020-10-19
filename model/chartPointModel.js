const  mongoose=require('mongoose')
const Schema=mongoose.Schema
const chargePointSchema=Schema({
    status:{
        type:String,
        requred:true
    },
    chargeLocationtName:{
        type:String,
        required:true
    },
    chargePoint:{
        type:Array,
        required:true
    }
})
const chargePointModel=mongoose.model('chargePointModel',chargePointSchema)

module.exports=chargePointModel