const nodemailer = require('nodemailer');
const sendMail=(from, to ,subject,text,attachments,res)=>{
    let err=null
    to.map(single=>{
        // console.log('from',from,'to',single,'subject',subject,'massage',text,'att',attachments)
        // Step 1
        console.log('sending email to ',single)
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'publicforme5@gmail.com',
                pass: 'alaminatpublic'
            }
        });

        // Step 2
        let mailOptions = {
            from: from,
            to: single, 
            subject: subject,
            text: text,
            attachments: [
                { filename:attachments, path:`./uploads/${attachments}`  } 
            ]
        };

        // Step 3
        transporter.sendMail(mailOptions, (err, data) => {
            console.log(data)
            if (err) {
                return err=true
            }
            return console.log('Email sent!!!');
        });
    })
    if(err){
        res.status(500).json({massage:'Send failed! try later !!'})
    }
    else{
        
        res.status(200).json({massage:'Send  Success !!'})
    }
    
}

module.exports=sendMail