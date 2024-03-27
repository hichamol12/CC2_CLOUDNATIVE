const express = require('express');
const router = express.Router();
const Tache = require('./tache');

router.post('/taches', async (req, res) => {
    try {
        const { titre, description, date_echeance, priorite } = req.body;

        const existingTache = await Tache.findOne({ titre });
        if (existingTache) {
            return res.status(400).json({ message: "Le titre doit être unique." });
        }
        if (isNaN(priorite)) {
            return res.status(400).json({ message: "La priorité doit être un nombre." });
        }
        const nouvelleTache = new Tache({ titre, description, date_echeance, priorite });
        await nouvelleTache.save();
        res.status(201).json({ message: 'Ajoutée avec succès', tache: nouvelleTache });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erreur de l'ajout." });
    }
});

router.get('/taches/:id', async (req, res) => {
    try {
        const tache = await Tache.findById(req.params.id);
        if (!tache) {
            return res.status(404).json({ message: 'Tâche non trouvée' });
        }
        res.status(200).json(tache);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erreur de la récupération des détails" });
    }
});

module.exports = router;