const express = require('express')
const AccidentCtrl = require('../controllers/accident-ctrl')
const router = express.Router()
router.get('/accidents', AccidentCtrl.getAccidents)
router.get('/accidents/:county/:year', AccidentCtrl.queryContyCountMonthly)
module.exports = router