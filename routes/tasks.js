const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

// Récupérer les tâches pour un étudiant
router.get('/:matricule', async (req, res) => {
  try {
    const taskData = await Task.findOne({ matricule: req.params.matricule });
    res.json(taskData || { tasks: [] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Mettre à jour les tâches
router.put('/:matricule', async (req, res) => {
  try {
    const { tasks } = req.body;
    const updated = await Task.findOneAndUpdate(
      { matricule: req.params.matricule },
      { tasks },
      { new: true, upsert: true } // Crée si n'existe pas
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
