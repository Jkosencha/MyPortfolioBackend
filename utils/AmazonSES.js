const {SendEmailCommand , SESClient } = require('@aws-sdk/client-ses')
const path = require('path')
const ejs = require('ejs')


const sesClient = new SESClient({
    region:"",
    credentials:{
        accessKeyId:process.env.AMAZON_ACCESS_KEY,
        secretAccessKey:process.env.AMAZON_SECRET_KEY,
    }
})

const mainEntryPoint = async(params)=>{
    const sendEmailCommand = new SendEmailCommand(params)
    return new Promise(async(resolve,reject) => {
        try {
           const response = await sesClient.send(sendEmailCommand)
           resolve(`Email was sent succesfully`)
           console.log(response.MessageId)
        } catch (error) {
            reject(error.message)
        }
    }) 
}

const sendEmail =async (fromEmail,userName, phoneNumber, message)=> {
    const templaPath = path.join(process.cwd(), "templates/email.html")
    const emailHtml = await ejs.renderFile(templaPath, {
        fromEmail,
        userName,
        phoneNumber,
        message
    })

    const params = {
        Destination:{
            ToAddresses:["jenniferkosencha@gmail.com"]
        },
        Message:{
            Charset:"UTF-8",
            Data: emailHtml
        },
        Subject:{
            Charset:"UTF-8",
            Data: "You got a Message From Your Portfolio"
        },
        Source: process.env.SOURCE_EMAIL 
    }
    const response  = await mainEntryPoint(params)
    return response
}


module.exports = sendEmail
