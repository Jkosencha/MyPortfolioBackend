const express = require('express')
const dotenv = require('dotenv')
const bodyParser = require('body-parser')
const cors = require('cors')


const app = express();
app.use("*",cors())
app.use(express.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
    limit: "10mb",
  })
);


const PORT = process.env.PORT || 5000
app.listen(PORT, async() => {
    console.log(`Server is running at http://localhost:${PORT}`);
})

