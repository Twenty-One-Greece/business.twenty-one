const mongoose = require('mongoose')
const Schema = mongoose.Schema

// create a schema
const customerSchema = new Schema({
    name: { type: String, required: true },
    company: { type: String, default: '' },
    email: { type: String, default: '' },
    country: { type: String, default: '' },
    city: { type: String, default: '' },
    telephone: { type: Number, default: '' },
    created_at: Date,
    updated_at: Date
});


// On every save, add the date
customerSchema.pre('save', function(next) {
    var currentDate = new Date()
    this.updated_at = currentDate
    if (!this.created_at) this.created_at = currentDate
    next()
})

const Customer = mongoose.model('Customer', customerSchema)

module.exports = Customer