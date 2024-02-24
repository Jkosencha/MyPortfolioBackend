const express = require('express')
const dotenv = require('dotenv')
dotenv.config()
const bodyParser = require('body-parser')
const cors = require('cors')
const emailRoutes = require('./routes/email.route')



const app = express();
app.use("*",cors())
app.use(express.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
    limit: "10mb",
  })
);

app.get("/", (req,res) => {
  res.send("Server Health Check Status Ok.")
})

app.use('/portfolio', emailRoutes)


console.log(process.env.PORT)
const PORT = process.env.PORT
app.listen(PORT, async() => {
    console.log(`Server is running at http://localhost:${PORT}`);
})

