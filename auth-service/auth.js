const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Utilisateur = require('./model');

const app = express();
app.use(express.json())
require('dotenv').config();

app.get('/register', async (req, res) => {
    const { nom, email, login, mdp } = req.body;
    try {
        const utilisateur = Utilisateur.findOne({email});
        if (utilisateur) {
            res.status(409).send("Cet e-mail est déjà utilisé.");
        }
        const hashedPassword = await bcrypt.hash(mdp, 10);
        utilisateur = new Utilisateur({ nom, email, login, mdp: hashedPassword });
        await utilisateur.save();
        res.status(201).send('sucess');
    } catch (error) {
        console.log('ERROR', error);
        res.status(400).send("Erreur de saisie");
    }
});

router.post('/login', async (req, res) => {
    console.log(req.body);
    try {
        const { login, mdp } = req.body;
        const utilisateur = await Utilisateur.findOne({ login });
        if (!utilisateur) {

        return res.status(400).json({ message: "Utilisateur non trouvé" });
        }

        const password= await bcrypt.compare(mdp, utilisateur.mdp);
        if (!password) {
        return res.status(400).json({ message: "Mot de passe incorrect" });
        }

        const token = jwt.sign({ userId: utilisateur._id }, 'votre_secret');

        res.json({ token });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Erreur serveur");
    }
});

module.exports = router;