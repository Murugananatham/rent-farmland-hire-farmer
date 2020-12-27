const LandDetails = require('../models/land-details')

getDetails = async (req, res) => {
    await LandDetails.find({}, (err, Land_details) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!Land_details.length) {
            return res
                .status(404)
                .json({ success: false, error: `Details not found` })
        }
        return res.status(200).json({ success: true, data: Land_details })
    }).catch(err => console.log(err))
}

module.exports = {
    getDetails,
}