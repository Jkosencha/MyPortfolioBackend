const express = require('express')
const sendPortfolioEmail = require('../controller/email.controller')
const Router = express.Router()


Router.route('/email').post(sendPortfolioEmail)

module.exports = Router