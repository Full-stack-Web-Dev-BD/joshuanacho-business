const express=require('express')
const app=express()
const PORT=process.env.PORT||5000
const mongoos=require('mongoose')
const bodyParser=require('body-parser')
const cors =require('cors')
const multer=require('multer')
const mailer=require('./mailer')
const userRouter=require('./router/userRouter')
const path=require('path')
const userModel = require('./model/userModel')

const storage = multer.diskStorage({
    destination:function(req, file , cb){
        cb(null , './client/uploads/')
    }, 
    filename:function(req, file , cb){
        cb(null ,  Date.now().toString()+file.originalname  )
    }
})

const upload =multer({storage:storage})




app.use(cors())
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use(userRouter)


app.post('/send-email' ,upload.single('file'), (req, res)=>{
    mailer(
        req.body.from,
        req.body.to.split(','),
        req.body.subject,
        req.body.massage,
        req.file.filename,
        res
    )
})
app.post('/uploadPP',upload.single('file'),(req,res)=>{
    userModel.findOne({_id:req.body.uid})
    .then(user=>{
        user.pp=req.file.filename
        user.save()
        .then(user=>{
            res.status(200).json(user)
        })
        .catch(err=>{
            return res.status(500).json({message:"Server error occurd "})
        })
    })
    .catch(err=>{
        console.log(err);
    })
})


// If no API routes are hit, send the build version of the React client
app.use(express.static(path.join(__dirname, './client/build')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './client/build/index.html'));
});

// app.use(express.static(path.join(__dirname,'./client/build')))
// app.get('*',(req,res)=>{
//     res.sendFile(path.join(__dirname,'./client/build/index.html'))
// })
app.listen(PORT, (req, res)=>{
    console.log('Server started on port ', PORT)
    mongoos.connect('mongodb://localhost/load',{useFindAndModify:false,useUnifiedTopology:true,useNewUrlParser:true},(err=>{
        if(err){
            console.log(err)
            return
        }
        console.log('Mongodb  connected')
    }))
})

// mongodb+srv://alamin:alamin@alamin.edsox.mongodb.net/alamin?retryWrites=true&w=majority