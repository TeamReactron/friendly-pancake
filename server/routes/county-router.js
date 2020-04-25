const express = require('express')
const CountyCtrl = require('../controllers/county-ctrl')
const router = express.Router()
router.get('/county/:id', CountyCtrl.getCountyByID)
router.get('/counties', CountyCtrl.getCounty)
module.exports = router