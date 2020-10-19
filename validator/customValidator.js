const validator=require('validator')
const registerValidator= (req)=>{
    const {name,email,password,confirmPassword}=req.body
    let error={}
    if(!name){
        error.name="Name required !!"
    }
    if(!email){
        error.email="Email required !!"
    }else if(!validator.default.isEmail(req.body.email)){
        error.email="Email not valid!!"
    }
    if(!password){
        error.password="Password required !!"
    }
    if(!confirmPassword){
        error.confirmPassword="Confirm password  required !!"
    }else if(password!==confirmPassword){
        error.confirmPassword="Confirm  password does not match with password !!"
    }
    
    
    return{
        isValid:Object.keys(error).length===0,
        error:error
    }
}
const loginValidator=(req)=>{
    let err={}
    if(!req.body.email){
        err.email="Email required !!!"
    } else if(!validator.default.isEmail(req.body.email)){
        err.email="Email not valid"
    }
    if(!req.body.password){
        err.password="Password required !!!"
    }
    return{
        isValid:Object.keys(err).length===0,
        err:err
    }
}
const chargeLocationValidator=(req)=>{
    let err={}
    if(!req.body.status){
        err.status="Status Required !"
    }
    if(!req.body.chargeLocationtName){
        err.chargeLocationtName="Charge Point Name Required !"
    }
    return{
        isValid:Object.keys(err).length===0,
        err:err
    }
}

const chargePointValidator=(req)=>{
    console.log(req.body)
    let err={}
    if(!req.body.cpname){
        err.cpname="Charger Point  Name  Required !"
    }
    if(!req.body.status){
        err.status="Status Required !"
    }
    if(!req.body.kw){
        err.kw="Charger KW Required !"
    }
    if(!req.body.type){
        err.type="Type Required !"
    }
    if(!req.body.cost){
        err.cost="Cost Required !"
    }
    if(!req.body.clid){
        err.clid="Charge location id required !"
    }
    console.log(err)
    return{
        isValid:Object.keys(err).length===0,
        err:err
    }
}
module.exports={
    loginValidator,
    registerValidator,
    chargeLocationValidator,
    chargePointValidator
}