const mongoose = require('mongoose')
const Schema = mongoose.Schema

// create a schema
const serviceSchema = new Schema({
    name: { type: String, required: true },
    userID: { type: String, required: true },
    category: { type: String, default: '' },
    tax: { type: String, default: '' },
    active: { type: Boolean, default: true },
    price: { type: Number, default: '' },
    priceWithTax: { type: Number, default: '' },
    created_at: Date,
    updated_at: Date
});


// On every save, add the date
serviceSchema.pre('save', function(next) {
    var currentDate = new Date()
    this.updated_at = currentDate
    if (!this.created_at) this.created_at = currentDate
    next()
})

const Service = mongoose.model('Service', serviceSchema)

module.exports = Service