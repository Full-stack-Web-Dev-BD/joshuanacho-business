const transectionRouter=require('express').Router()
const transectionController=require('../controller/transectionController')



transectionRouter.post('/importdata',transectionController.createTransection)
transectionRouter.get('/sales',transectionController.filterSales)

module.exports=transectionRouter