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
router.post('/one', (req, res) => {
    const data = req.body
    Service.findOne(data, (err, service) => {
        if (err) return res.send(err)
        return res.send(service)
    })
})

// Delete One Service
router.delete('/one/:serviceID', (req, res) => {
    Service.findByIdAndRemove(req.params.serviceID, (err) => {
        if (err) return res.send(err)
        return res.send({ message: "Service Deleted" })
    })
})

// Update Service by ID
router.post('/update/:serviceID', (req, res) => {
    const data = req.body

    Service.findById(req.params.serviceID, (err, service) => {
        if (err) return res.send(err)

        service.name            = data.name           || service.name
        service.category        = data.category       || service.category
        service.price           = data.price          || service.price
        service.priceWithTax    = data.priceWithTax   || service.priceWithTax
        service.tax             = data.tax            || service.tax
        service.active          = data.active         || false

        service.save((err, service) => {
            if (err) return res.send(err)
        })
        return res.send({ message: "Service Updated" })
    })
})


module.exports = router;