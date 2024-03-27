const express = require('express');
const router = express.Router();
const Activite = require('../models/Activite');
const Utilisateur = require('../models/Utilisateur');
const Tache = require('../models/Tache');

router.post('/activites', async (req, res) => {
    try {
        const { utilisateur_id, tache_id } = req.body;

        const utilisateurExiste = await Utilisateur.findById(utilisateur_id);
        if (!utilisateurExiste) {
            return res.status(404).json({ message: "Utilisateur non trouvé" });
        }

        const tacheExiste = await Tache.findById(tache_id);
        if (!tacheExiste) {
            return res.status(404).json({ message: "Tâche non trouvée" });
        }

        const nouvelleActivite = new Activite({ utilisateur_id, tache_id });
        await nouvelleActivite.save();

        res.status(201).json({ message: 'Ajoutée avec succès', activite: nouvelleActivite });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erreur dans l'ajout" });
    }
});

module.exports = router;