const express = require('express')
const app = express()
const PORT = process.env.PORT || 5000
const mongoos = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
const multer = require('multer')
const mailer = require('./mailer')
const userRouter = require('./router/userRouter')
const transection = require('./router/transection')
const path = require('path')
const userModel = require('./model/userModel')
const xlsxj = require("xlsx-to-json");
var XLSX = require('xlsx');
const Transection = require('./model/Transection')





app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './client/uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now().toString() + file.originalname)
    }
})

const storage2 = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now().toString() + file.originalname)
    }
})

const upload = multer({ storage: storage })
const upload2 = multer({ storage: storage2 })



app.use(userRouter)
app.use(transection)
app.post('/send-email', upload2.single('file'), (req, res) => {
    mailer(
        req.body.from,
        req.body.to.split(','),
        req.body.subject,
        req.body.massage,
        req.file.filename,
        res
    )
})

app.post('/uploadPP', upload.single('file'), (req, res) => {
    userModel.findOne({ _id: req.body.uid })
        .then(user => {
            user.pp = req.file.filename
            user.save()
                .then(user => {
                    res.status(200).json(user)
                })
                .catch(err => {
                    return res.status(500).json({ message: "Server error occurd " })
                })
        })
        .catch(err => {
            console.log(err);
        })
})

app.post('/import-data-from-xlsx', upload2.single('file'), (req, res) => {
    var workbook = XLSX.readFile(`./uploads/${req.file.filename}`,{cellDates:true});
    var sheet_name_list = workbook.SheetNames;
    let result=XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]])

    async function importToDB() {
        let pushDb = result.map(async element => {

            // let validDate = `${ind[1] + '/' + ind[0] + '/' + ind[2]}`
            // let validDate = `${ind[1] + '/' + ind[0] + '/' + ind[2]}`
            console.log(typeof(element['insert date']))
            await new Transection({
                insertDate: element['insert date'],
                product: element.product,
                brand: element.brand,
                category: element.category,
                description: element.description,
                rating: element.rating,
                sellerInformation: element['seller information'],
                currentPrice: element['current price'],
                currentPriceDate: element['current price date'],
                oldPrice: element['old price'],
                oldPriceDate: element['old price date'],
                priceChange: element['price change %'],
                url: element.url,
            })
                .save()
                .then(doc => {
                    // console.log('added');
                })
                .catch(err => {
                    return console.log(err);
                })
        })
        await Promise.all(pushDb)
        // console.log('done');
        return res.status(200).json({ message: "Uploaded" })
    }
    importToDB()
    return
    xlsxj({
        input: `./uploads/${req.file.filename}`,
        output: `./uploads/${req.file.filename}.json`
    }, function (err, result) {
        if (err) {
            return res.status(500).json({ message: "Out or range" })
        } else {
            console.log(result);
            // try {
            //     // fs.unlinkSync('./uploads/output.json')
            //     // fs.unlinkSync(`./uploads/${req.file.filename}`)
            // } catch (err) {
            //     console.error('File not found')
            // }
            console.log('response send');

            console.log({ fileName: `${req.file.filename}.json` });
            // return res.json(removes)
            return res.json({ result: result, fileName: `${req.file.filename}.json` })
        }
    });
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
app.listen(PORT, (req, res) => {
    console.log('Server started on port ', PORT)
    mongoos.connect('mongodb://localhost/load', { useFindAndModify: false, useUnifiedTopology: true, useNewUrlParser: true }, (err => {
        if (err) {
            console.log(err)
            return
        }
        console.log('Mongodb  connected')
    }))
})
