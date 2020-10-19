const customValidator = require('../validator/customValidator')
const chargePointModel = require('../model/chartPointModel')

const createChargeLocation = (req, res) => {
    let verify = customValidator.chargeLocationValidator(req)
    if (!verify.isValid) {
        return res.status(400).json(verify.err)
    }
    new chargePointModel({
        status: req.body.status,
        chargeLocationtName: req.body.chargeLocationtName,
        chargePoint: []
    }).save()
        .then(created => {
            return res.status(200).json({ message: 'Charge Location created' })
        })
        .catch(err => {
            return res.status(500).json({ message: "Server error occurd " })
        })
}
const getAllLocation = (req, res) => {
    chargePointModel.find({})
        .then(doc => {
            return res.status(200).json({ status: true, location: doc })
        })
        .catch(err => {
            return res.status(500).json({ status: false, message: "server error occurd" })
        })
}
const removeChargeLocation = (req, res) => {
    chargePointModel.findOneAndDelete(req.params.id)
        .then(delted => {
            return res.status(200).json({ status: true, message: 'Charge Location Deleted' })
        })
        .catch(err => {
            return res.status(500).json({ status: false, message: "server error" })
        })
}
const getchargepoints = (req, res) => {
    let id = req.params.id
    chargePointModel.findOne({ _id: id })
        .then(doc => {
            res.status(200).json({ status: true, chargelocation: doc })
        })
        .catch(err => {
            return res.status(500).json({ status: false, message: "Server error occurd " })
        })
}
const addChargePoint = (req, res) => {
    let verify = customValidator.chargePointValidator(req)
    if (!verify.isValid) {
        return res.status(400).json(verify.err)
    }
    chargePointModel.findOne({ _id: req.body.clid })
        .then(cl => {
            var randLetter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
            var uniqid = randLetter + Date.now();

            cl.chargePoint.push({
                cpName: req.body.cpname,
                status: req.body.status,
                kw: req.body.kw,
                type: req.body.type,
                cost: req.body.cost,
                id: uniqid
            })
            cl.save()
                .then(added => {
                    return res.status(200).json({ status: true, message: 'Charge Point Added' })
                })
                .catch(err => {
                    return res.status(500).json({ status: false, message: "Server error occurd " })
                })
        })
}
const removeChargePoint = (req, res) => {
    console.log(req.body)
    if (!req.body.clid || !req.body.cpid) {
        return res.status(400).json({ message: 'cpid and clid is requried' })
    }
    chargePointModel.findOne({ _id: req.body.clid })
        .then(cp => {
            const i = cp.chargePoint.findIndex(el => el.id === req.body.cpid)
            if (i === -1) {
                return res.status({ status: false, message: "Not found" })
            }
            const updatedCp = cp
            console.log(updatedCp)
            updatedCp.chargePoint.splice(i, 1)
            console.log(updatedCp)
            chargePointModel.findByIdAndUpdate(req.body.clid, { $set: updatedCp }, { new: true })
                .then(updated => {
                    return res.status(200).json({ status: false, message: 'Removed charge point' })
                })
                .catch(err => {
                    console.log(err)
                    return res.status(500).json({ status: false, message: 'Server error occure' })
                })
        })
}

const findChargePoint = (req, res) => {
    console.log(req.body)

    if (!req.body.clid || !req.body.cpid) {
        return res.status(400).json({ message: 'cpid and clid is requried' })
    }

    chargePointModel.findOne({ _id: req.body.clid })
        .then(cp => {
            const i = cp.chargePoint.findIndex(el => el.id === req.body.cpid)
            if (i === -1) {
                return res.status(400).json({ status: false, message: "Not found" })
            } else {
                return res.status(200).json({ status: true, chargePoint: cp.chargePoint[i] })
            }
        })
        .catch(err => {
            return res.status(500).json({ status: false, message: "Server error occurd " })
        })
}

const findLocation = (req, res) => {
    let keyword = req.body.keyword
    if (!keyword) {
        return res.status(400).json({ status: false, message: "Keyword not founded " })
    }
    chargePointModel.find()
        .then(loc => {
            let result = []
            loc.map(el => {
                let splited = el.chargeLocationtName.split(' ')
                splited.map(sel => {
                    console.log(sel, keyword)
                    if (sel.toLowerCase() === keyword.toLowerCase()) {
                        console.log('true')
                        return result.push(el)
                    }
                })
            })
            return res.status(200).json({ status: true, location: result })
        })
}
module.exports = {
    createChargeLocation,
    removeChargeLocation,
    addChargePoint,
    removeChargePoint,
    getAllLocation,
    getchargepoints,
    findChargePoint,
    findLocation
}
