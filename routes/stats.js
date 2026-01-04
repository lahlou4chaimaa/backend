const express = require('express');
const router = express.Router();
const Student = require('../models/Etudiant'); // ou la collection où tu stockes les étudiants
const Task = require('../models/Task');       // collection des notes

// GET stats d'un étudiant
router.get('/:matricule', async (req, res) => {
  try {
    const { matricule } = req.params;

    // Récupérer l'étudiant
    const student = await Student.findOne({ matricule });
    if (!student) return res.status(404).json({ message: 'Étudiant introuvable' });

    // Récupérer ses notes
    const grades = await Grade.find({ studentMatricule: matricule });

    // Calculs simples : moyenne, crédits, présence fictive
    const moyenne =
      grades.reduce((sum, g) => sum + g.grade * g.coef, 0) /
      grades.reduce((sum, g) => sum + g.coef, 1);

    const totalCredits = grades.reduce((sum, g) => sum + g.coef, 0);

    res.json({
      student,
      moyenne: moyenne.toFixed(2),
      grades,
      credits: totalCredits,
      totalCredits: 60, // par exemple
      presenceRate: 90, // tu peux stocker réel dans la BD
      completionRate: 80,
      ranking: 12,
      totalStudents: 150,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
