const transectionRouter=require('express').Router()
const transectionController=require('../controller/transectionController')



transectionRouter.post('/importdata',transectionController.createTransection)

module.exports=transectionRouter