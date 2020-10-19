const { update } = require('../model/ChargingModel');
const chargingModel = require('../model/ChargingModel');
const chargingRouter = require('../router/chargingRouter');


module.exports = {
    startCharge(req, res) {
        console.log(req.body)
        new chargingModel(req.body)
            .save()
            .then(saved => {
                return res.status(200).json({ status: true, info: saved, message: 'Charging started ' })
            })
            .catch(err => {
                console.log(err)
                return res.status(500).json({ sttus: false, message: "Server error occurd " })
            })
    },
    findchargingstate(req, res) {
        let id = req.params.id
        chargingModel.findOne({ _id: id })
            .then(chargingState => {
                return res.status(200).json({ status: true, chargingState: chargingState })
            })
            .catch(err => {
                console.log(err)
                return res.status(500).json({ message: "Server error" })
            })
    },
    findchargingHistory(req,res){
        chargingModel.find({uid:req.params.id})
        .then(cHistory=>{
            return res.status(200).json({status:true, history:cHistory})
        })
        .catch(err=>{
            return res.status(500).json({status:false,message:"Server error"})
        })
    },
    
    findchargingHistoryall(req,res){
        chargingModel.find()
        .then(cHistory=>{
            return res.status(200).json({status:true, history:cHistory})
        })
        .catch(err=>{
            return res.status(500).json({status:false,message:"Server error"})
        })
    },
    togglePayment(req,res){
        chargingModel.findOne({_id:req.params.id})
        .then(ch=>{
            ch.paid=!ch.paid
            ch.save().then(updated=>{
                return res.status(200).json({message:"Updated"})
            })
            .catch(err=>{
                return res.status(500).json({message:"Server error occurd "})
            })
        })
        .catch(err=>{
            return res.status(500).json({message:"Server error occurd "})
        })
    }
}