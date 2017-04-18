const express = require("express");
const router = express.Router();
const Service = require('../models/serviceSchema.js')


// Create New Service
router.post('/new', (req, res) => {
    const data = req.body
    const newService = new Service(data)

    newService.save((err) => {
        if (err) return res.send(err)
        return res.send({ message: "New Service created" })
    })
})

// Get All Service of a User
router.post('/all', (req, res) => {
    const data = req.body
    Service.find(data, (err, services) => {
        if (err) return res.send(err)
        return res.send(services)
    })
})

// Get One Service
router.delete('/one/:serviceID', (req, res) => {
    Service.findByIdAndRemove(req.params.serviceID, (err) => {
        if (err) return res.send(err)
        return res.send({ message: "Service Deleted" })
    })
})


module.exports = router;