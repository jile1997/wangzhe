const mongoose = require('mongoose')
const schema = new mongoose.Schema({
    name: { type: String },
    parent: { type: mongoose.SchemaTypes.ObjectId, ref: 'editlb' }
})

module.exports = mongoose.model('editlb', schema)