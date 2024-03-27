const mongoose = required('mongoose');

const Activite = new mongoose.Schema({
    utilisateur_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Utilisateur' },
    tache_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Tache' },
});

module.exports = mongoose.model('Activite', Activite);