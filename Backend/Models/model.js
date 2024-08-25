const mongoose = require('mongoose');

const modelSchema = new mongoose.Schema({
    name: String,
    teams: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Team'
    }],
    smes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Smes'
    }],
    submodels: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Model' // Refers to itself for submodels
    }]
});

module.exports = mongoose.model('Model', modelSchema);