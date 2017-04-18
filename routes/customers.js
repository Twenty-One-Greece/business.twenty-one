const express = require("express");
const router = express.Router();
const Customer = require('../models/customerSchema.js')


// Create New Destination
router.post('/new', (req, res) => {
    const data = req.body
    const newCustomer = new Customer(data)

    newCustomer.save((err) => {
        if (err) return res.send(err)
        return res.send({ message: "New Customer created" })
    })
})

// Get All Customer of a User
router.post('/all', (req, res) => {
    const data = req.body
    Customer.find(data, (err, customers) => {
        if (err) return res.send(err)
        return res.send(customers)
    })
})

module.exports = router;