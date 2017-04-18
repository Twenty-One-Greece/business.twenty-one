const express = require("express");
const router = express.Router();
const Customer = require('../models/customerSchema.js')

// Create New Customer
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

// Get One Customer
router.post('/one', (req, res) => {
    const data = req.body
    Customer.findOne(data, (err, customer) => {
        if (err) return res.send(err)
        return res.send(customer)
    })
})

// Delete One Customer
router.delete('/one/:customerID', (req, res) => {
    Customer.findByIdAndRemove(req.params.customerID, (err) => {
        if (err) return res.send(err)
        return res.send({ message: "Customer Deleted" })
    })
})

// Update Customer by ID
router.post('/update/:customerID', (req, res) => {
    const data = req.body

    Customer.findById(req.params.customerID, (err, customer) => {
        if (err) return res.send(err)

        customer.name       = data.name       || customer.name
        customer.email      = data.email      || customer.email
        customer.company    = data.company    || customer.company
        customer.country    = data.country    || customer.country
        customer.city       = data.city       || customer.city
        customer.telephone  = data.telephone  || customer.telephone
        customer.mobile     = data.mobile     || customer.mobile


        customer.save((err, customer) => {
            if (err) return res.send(err)
        })
        return res.send({ message: "Customer Updated" })
    })
})

module.exports = router;