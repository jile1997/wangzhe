const mongoose = require('mongoose')
const schema = new mongoose.Schema({
    name: { type: String },
    avatar: { type: String },
    title: { type: String },
    categories: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'editlb' }],
    scores: {
        difficult: { type: Number },
        skills: { type: Number },
        attack: { type: Number },
        survive: { type: Number },
    },
    skills: [{
        icon: { type: String },
        name: { type: String },
        delay: { type: String },
        cost: { type: String },
        description: { type: String },
        tips: { type: String },
    }],
    items1: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'itemlb' }],
    items2: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'itemlb' }],
    usageTips: { type: String },
    battleTips: { type: String },
    teamTips: { type: String },
    partners: [{
        hero: { type: mongoose.SchemaTypes.ObjectId, ref: 'hero' },
        description: { type: String },
    }],
})

module.exports = mongoose.model('heros', schema)