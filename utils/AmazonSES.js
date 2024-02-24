const {SendEmailCommand , SESClient } = require('@aws-sdk/client-ses')
const dotenv = require('dotenv')
dotenv.config()
const path = require('path')
const ejs = require('ejs')

console.log("AccsKey", process.env.AMAZON_ACCESS_KEY)
const sesClient = new SESClient({
    region:"us-east-1",
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
            console.log(error)
            reject(error.message)
        }
    }) 
}

const sendEmail =async (fromEmail,userName, phoneNumber, message)=> {
    const templatePath = path.join(process.cwd(), "templates/email.html")
    const emailHtml = await ejs.renderFile(templatePath, {
        fromEmail,
        userName,
        phoneNumber,
        message,
        currentYear: new Date().getFullYear()
    })
    const params = {
        Destination:{
            ToAddresses:["kosenchajennifer@gmail.com"]
        },
        Message:{
          Body:{
            Html:{
                Charset:"UTF-8",
                Data: emailHtml
               }
          },
          Subject:{
            Charset:"UTF-8",
            Data: "You got a Message From Your Portfolio"
        },
        },
       
        Source: process.env.SOURCE_EMAIL 
    }
    const response  = await mainEntryPoint(params)
    return response
}


module.exports = sendEmail
