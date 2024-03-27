const mongoose = require('mongoose');

const Utilisateur = new mongoose.Schama({
    nom : String,
    email : String,
    login : String,
    mdp : String,
});

module.exports = mongoose.model('Utilisateur', Utilisateur);