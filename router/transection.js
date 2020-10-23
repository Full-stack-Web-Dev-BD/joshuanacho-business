const transectionRouter=require('express').Router()
const transectionController=require('../controller/transectionController')



transectionRouter.post('/importdata',transectionController.createTransection)
transectionRouter.get('/filter',transectionController.filterTransectionByMonth)

module.exports=transectionRouter