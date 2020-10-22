const Transection = require("../model/Transection")
const xlsxj = require("xlsx-to-json");


module.exports = {
    createTransection(req, res) {
        let filePath = `../uploads/${req.body.fileName}`
        const fData = require(`../uploads/${req.body.fileName}`)

        async function importToDB() {
            let pushDb = fData.map(async element => {
                let ind = element['insert date'].split('/')
                let validDate = `${ind[1] + '/' + ind[0] + '/' + ind[2]}`
                await new Transection({
                    insertDate: validDate,
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
    },
    filterSales(req, res) {
        Transection.find({ insertDate: { $gt: new Date(`${new Date().getFullYear()}-01-01T08:36:40.950Z`),$lt: new Date(`${new Date().getFullYear()}-05-01T08:36:40.950Z`) } })
        .then(rl => {
            console.log(rl);
            // gotData.push({ thisMont: rl })
        })
        .catch(err => {
            console.log(err);
        })
        return
        let allMonth=[

            {monthName:'January',inDate:`${new Date().getFullYear()}-01-01T08:36:40.950Z`},
            {monthName:'February',inDate:`${new Date().getFullYear()}-02-01T08:36:40.950Z`},
            {monthName:'March',inDate:`${new Date().getFullYear()}-03-01T08:36:40.950Z`},
            {monthName:'April',inDate:`${new Date().getFullYear()}-04-01T08:36:40.950Z`},
            {monthName:'May',inDate:`${new Date().getFullYear()}-05-01T08:36:40.950Z`},
            {monthName:'June',inDate:`${new Date().getFullYear()}-06-01T08:36:40.950Z`},
            {monthName:'July',inDate:`${new Date().getFullYear()}-07-01T08:36:40.950Z`},
            {monthName:'August',inDate:`${new Date().getFullYear()}-08-01T08:36:40.950Z`},
            {monthName:'September',inDate:`${new Date().getFullYear()}-09-01T08:36:40.950Z`},
            {monthName:'October',inDate:`${new Date().getFullYear()}-10-01T08:36:40.950Z`},
            {monthName:'November',inDate:`${new Date().getFullYear()}-11-01T08:36:40.950Z`},
            {monthName:'December',inDate:`${new Date().getFullYear()}-12-01T08:36:40.950Z`},
        ]
        let gotData = []
        async function collectData() {
            allMonth.map(async el=>{
                await Transection.find({ insertDate: { $gt: new Date(`${new Date().getFullYear()}-01-01T08:36:40.950Z`),$lt: new Date(`${new Date().getFullYear()}-11-01T08:36:40.950Z`) } })
                    .then(rl => {
                        gotData.push({ thisMont: rl })
                    })
                    .catch(err => {
                        console.log(err);
                    })
            })
        }

        
        
        
        return
        Transection.find()
            .then(transection => {
                console.log(transection.length);
                let thisYear = new Date().getFullYear()
                var getDaysInMonth = function (year, month) {
                    return new Date(year, month, 0).getDate();
                };
                const insertTime = (inTime) => {
                    return new Date(inTime).getTime()
                }
                let janStart = new Date(thisYear + '/' + '01' + '/' + '01').getTime()
                let janEnd = new Date(thisYear + '/' + '01' + '/' + `0${getDaysInMonth(thisYear, 1)}`)
                let janList = []


                let octStart = new Date(thisYear + '/' + '10' + '/' + '01').getTime()
                let octEnd = new Date(thisYear + '/' + '10' + '/' + `0${getDaysInMonth(thisYear, 1)}`)
                let octList = []


                transection.map(el => {
                    if (insertTime(el.insertDate) >= janStart && insertTime(el.insertDate) <= janEnd) {
                        console.log('founeded');
                    }
                    if (insertTime(el.insertDate) >= octStart && insertTime(el.insertDate) <= octEnd) {
                        console.log('octabor');
                    }

                })
            })
            .catch(err => {
                console.log(err);
            })
    }
}
