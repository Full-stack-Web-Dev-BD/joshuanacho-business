const transectionRouter=require('express').Router()
const transectionController=require('../controller/transectionController')



transectionRouter.post('/importdata',transectionController.createTransection)
transectionRouter.get('/filter',transectionController.filterTransectionByMonth)
transectionRouter.get('/thismonthtransection',transectionController.transectionOfMonth)
transectionRouter.get('/getall',transectionController.getAll)

module.exports=transectionRouter