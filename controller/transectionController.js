const Transection = require("../model/Transection")
const xlsxj = require("xlsx-to-json");


module.exports = {
    createTransection(req, res){
        xlsxj({
            input:`./uploads/1603225014909blanksheets.xlsx`,
            output: "./uploads/output.json"
        }, function (err, result) {
            if (err) {
                return res.status(500).json({ message: "Out or range" })
            } else {  console.error('File not found')
                for (let i = 0; i < 10; i++) {
                    console.log('added');
                   let element=result[i]
                    new Transection({
                        product:element.product,
                        brand:element.brand,
                        category:element.category,
                        description:element.description,
                        rating:element.rating,
                        sellerInformation:element['seller information'],
                        currentPrice:element['current price'],
                        currentPriceDate:element['current price date'],
                        oldPrice:element['old price'],
                        oldPriceDate:element['old price date'],
                        priceChange:element['price change %'],
                        url:element.url,
                    }) 
                }
                return res.json({ message:"Saved"})
            }
        });
    }
}
