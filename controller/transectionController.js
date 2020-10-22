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

        function daysInMonth(month) {
            return new Date(new Date().getFullYear(), month, 0).getDate();
        }
        let allMonth = [
            { monthName: 'January', gt: `${new Date().getFullYear()}-01-01T08:36:40.950Z`, lt: `${new Date().getFullYear()}-01-${daysInMonth(12)}T08:36:40.950Z` },
            { monthName: 'February', gt: `${new Date().getFullYear()}-02-01T08:36:40.950Z`, lt: `${new Date().getFullYear()}-02-${daysInMonth(12)}T08:36:40.950Z` },
            { monthName: 'March', gt: `${new Date().getFullYear()}-03-01T08:36:40.950Z`, lt: `${new Date().getFullYear()}-03-${daysInMonth(12)}T08:36:40.950Z` },
            { monthName: 'April', gt: `${new Date().getFullYear()}-04-01T08:36:40.950Z`, lt: `${new Date().getFullYear()}-04-${daysInMonth(12)}T08:36:40.950Z` },
            { monthName: 'May', gt: `${new Date().getFullYear()}-05-01T08:36:40.950Z`, lt: `${new Date().getFullYear()}-05-${daysInMonth(12)}T08:36:40.950Z` },
            { monthName: 'June', gt: `${new Date().getFullYear()}-06-01T08:36:40.950Z`, lt: `${new Date().getFullYear()}-06-${daysInMonth(12)}T08:36:40.950Z` },
            { monthName: 'July', gt: `${new Date().getFullYear()}-07-01T08:36:40.950Z`, lt: `${new Date().getFullYear()}-07-${daysInMonth(12)}T08:36:40.950Z` },
            { monthName: 'August', gt: `${new Date().getFullYear()}-08-01T08:36:40.950Z`, lt: `${new Date().getFullYear()}-08-${daysInMonth(12)}T08:36:40.950Z` },
            { monthName: 'September', gt: `${new Date().getFullYear()}-09-01T08:36:40.950Z`, lt: `${new Date().getFullYear()}-09-${daysInMonth(12)}T08:36:40.950Z` },
            { monthName: 'October', gt: `${new Date().getFullYear()}-10-01T08:36:40.950Z`, lt: `${new Date().getFullYear()}-10-${daysInMonth(12)}T08:36:40.950Z` },
            { monthName: 'November', gt: `${new Date().getFullYear()}-11-01T08:36:40.950Z`, lt: `${new Date().getFullYear()}-11-${daysInMonth(12)}T08:36:40.950Z` },
            { monthName: 'December', gt: `${new Date().getFullYear()}-12-01T08:36:40.950Z`, lt: `${new Date().getFullYear()}-12-${daysInMonth(12)}T08:36:40.950Z` },
        ]
        let filteredData = {
            January:[],
            February:[],
            March:[],
            April:[],
            May:[],
            June:[],
            July:[],
            August:[],
            September:[],
            October:[],
            November:[],
            December:[]
    }
        async function collectData() {

            let filterData = allMonth.map(async el => {
                await Transection.find({ insertDate: { $gt: new Date(el.gt), $lt: new Date(el.lt) } })
                    .then(rl => {
                        if(el.monthName=="January"){
                            filteredData.January.push(rl)
                        }
                        if(el.monthName=="February"){
                            filteredData.February.push(rl)
                        }
                        if(el.monthName=="March"){
                            filteredData.March.push(rl)
                        }
                        if(el.monthName=="April"){
                            filteredData.April.push(rl)
                        }
                        if(el.monthName=="May"){
                            filteredData.May.push(rl)
                        }
                        if(el.monthName=="June"){
                            filteredData.June.push(rl)
                        }
                        if(el.monthName=="July"){
                            filteredData.July.push(rl)
                        }
                        if(el.monthName=="August"){
                            filteredData.August.push(rl)
                        }
                        if(el.monthName=="September"){
                            filteredData.September.push(rl)
                        }
                        if(el.monthName=="October"){
                            filteredData.October.push(rl)
                        }
                        if(el.monthName=="November"){
                            filteredData.November.push(rl)
                        }
                        if(el.monthName=="December"){
                            filteredData.December.push(rl)
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    })
            })
            await Promise.all(filterData)
            return res.status(200).json(filteredData)
        }
        collectData()
    }
}
