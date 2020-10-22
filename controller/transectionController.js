const Transection = require("../model/Transection")
const xlsxj = require("xlsx-to-json");


module.exports = {
    createTransection(req, res) {

        let filePath = `../uploads/${req.body.fileName}`
        const fData = require(`../uploads/${req.body.fileName}`)
        async function importToDB() {
            let pushDb = fData.map(async element => {
                await new Transection({
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
                        console.log('added');
                    })
                    .catch(err => {
                        return console.log(err);
                    })
            })
            await Promise.all(pushDb)
            // console.log('done');
            return res.status(200).json({message:"Uploaded"})
        }
        importToDB()
    }
}
