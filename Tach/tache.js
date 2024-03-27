const mongoose = require('mongoose');

const Tache = new mongoose.Schema({
    titre: String,
    description: String,
    date_echeance: Date,
    priorite: Number
});

module.exports = mongoose.model('Tache', Tache);
