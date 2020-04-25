const express = require('express')
const AccidentCtrl = require('../controllers/accident-ctrl')
const router = express.Router()
router.get('/accidents', AccidentCtrl.getAccidents)
module.exports = router