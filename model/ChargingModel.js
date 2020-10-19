const mongoose=require('mongoose')
const { schema } = require('./chartPointModel')
const Schema=mongoose.Schema

const chargingSchema=new Schema({
    
    chargerInfo:{
        type:Array
    },
    clid:{
        type:String
    },
    cpid:{
        type:String
    },
    uid:{
        type:Schema.Types.ObjectId
    },
    connectingTime:{
        type:String
    },
    chargeEndTime:{
        type:String
    },
    chargeTime:{
        type:Number
    },
    cost:{
        type:Number
    },
    completed:{
        type:Number
    },
    paid:{
        type:Boolean
    },
})



const chargingModel=mongoose.model('chargingModel',chargingSchema)
module.exports =chargingModel