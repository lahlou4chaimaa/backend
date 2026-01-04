const express = require("express");
const router = express.Router();
const Etudiant = require("../models/Etudiant");

// Sauvegarder un score
router.post("/score", async (req, res) => {
  try {
    const { userId, gameType, score } = req.body;

    if (!['logique', 'math', 'memory', 'reflex'].includes(gameType)) {
      return res.status(400).json({ message: "Type de jeu invalide" });
    }

    const etudiant = await Etudiant.findById(userId);
    if (!etudiant) {
      return res.status(404).json({ message: "Étudiant introuvable" });
    }

    // Mettre à jour le score si c'est le meilleur
    if (score > etudiant.gameScores[gameType]) {
      etudiant.gameScores[gameType] = score;
      await etudiant.save();
    }

    res.json({ 
      message: "Score enregistré",
      bestScore: etudiant.gameScores[gameType]
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur lors de la sauvegarde du score" });
  }
});

// Obtenir les scores d'un utilisateur
router.get("/scores/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    
    const etudiant = await Etudiant.findById(userId).select('gameScores nom prenom');
    if (!etudiant) {
      return res.status(404).json({ message: "Étudiant introuvable" });
    }

    res.json({ scores: etudiant.gameScores });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

// Obtenir le classement global
router.get("/leaderboard/:gameType", async (req, res) => {
  try {
    const { gameType } = req.params;
    
    if (!['logique', 'math', 'memory', 'reflex'].includes(gameType)) {
      return res.status(400).json({ message: "Type de jeu invalide" });
    }

    const sortField = `gameScores.${gameType}`;
    const etudiants = await Etudiant.find()
      .select('nom prenom avatar filiere gameScores')
      .sort({ [sortField]: -1 })
      .limit(50);

    const leaderboard = etudiants
      .filter(e => e.gameScores[gameType] > 0)
      .map((e, index) => ({
        rang: index + 1,
        nom: e.nom,
        prenom: e.prenom,
        avatar: e.avatar,
        filiere: e.filiere,
        score: e.gameScores[gameType]
      }));

    res.json({ leaderboard });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

// Générer une question de math aléatoire
router.get("/math/question", (req, res) => {
  const operations = ['+', '-', '*'];
  const operation = operations[Math.floor(Math.random() * operations.length)];
  
  let num1, num2, reponse;
  
  switch(operation) {
    case '+':
      num1 = Math.floor(Math.random() * 50) + 1;
      num2 = Math.floor(Math.random() * 50) + 1;
      reponse = num1 + num2;
      break;
    case '-':
      num1 = Math.floor(Math.random() * 50) + 20;
      num2 = Math.floor(Math.random() * num1);
      reponse = num1 - num2;
      break;
    case '*':
      num1 = Math.floor(Math.random() * 12) + 1;
      num2 = Math.floor(Math.random() * 12) + 1;
      reponse = num1 * num2;
      break;
  }
  
  res.json({
    question: `${num1} ${operation} ${num2}`,
    reponse
  });
});

// Générer une question de logique aléatoire
router.get("/logique/question", (req, res) => {
  const types = ['suite', 'pattern'];
  const type = types[Math.floor(Math.random() * types.length)];
  
  let question, reponse, options;
  
  if (type === 'suite') {
    const start = Math.floor(Math.random() * 10) + 1;
    const step = Math.floor(Math.random() * 5) + 2;
    const suite = [start, start + step, start + step * 2, start + step * 3];
    reponse = start + step * 4;
    
    question = `Quelle est la suite ? ${suite.join(', ')}, ?`;
    options = [reponse, reponse + 1, reponse - 1, reponse + step].sort(() => Math.random() - 0.5);
  } else {
    const base = Math.floor(Math.random() * 5) + 2;
    question = `Si A=1, B=2, C=3... Que vaut la lettre numéro ${base * 2} ?`;
    reponse = base * 2;
    options = [reponse, reponse + 1, reponse - 1, reponse + 2].sort(() => Math.random() - 0.5);
  }
  
  res.json({ question, reponse, options });
});

module.exports = router;