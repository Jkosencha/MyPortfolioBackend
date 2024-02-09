const expressAsyncHandler = require('express-async-handler')
const sendEmail = require('../utils/AmazonSES')


const sendPortfolioEmail = expressAsyncHandler(async(req,res)=> {
    try {
        const {fromEmail,userName, phoneNumber, message}  = req.body
       const response =  await sendEmail(fromEmail,userName, phoneNumber, message)
       res.status(200).json(response)
    } catch (error) {
        console.log(error)
        res.status(500).json("Internal Server Error")
    }
})

module.exports=sendPortfolioEmail