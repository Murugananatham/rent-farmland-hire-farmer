const express = require('express')

const rentNhire_ctrl = require('../controllers/rentNhire-ctrl')

const router = express.Router()


router.get('/land-details', rentNhire_ctrl.getDetails)

module.exports = router