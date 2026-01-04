const express = require("express");
const multer = require("multer");
const path = require("path");
const Fichier = require("../models/Fichier");

const router = express.Router();

// Configuration multer
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage });

// 📤 Upload fichier
router.post("/upload", upload.single("file"), async (req, res) => {
  try {
    const metadata = JSON.parse(req.body.metadata);
    const userData = JSON.parse(req.body.userData);

    const fichier = new Fichier({
      name: req.file.originalname,
      type: req.file.mimetype,
      size: req.file.size,
      url: `/uploads/${req.file.filename}`,

      filiere: metadata.filiere,
      year: metadata.year,
      groupe: metadata.groupe,
      category: metadata.category,

      uploadedBy: `${userData.nom} ${userData.prenom}`,
      matricule: userData.matricule
    });

    await fichier.save();

    res.status(201).json({
      success: true,
      message: "Fichier uploadé",
      file: fichier
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false });
  }
});

// 📥 Récupérer fichiers par étudiant
router.get("/:matricule", async (req, res) => {
  const files = await Fichier.find({ matricule: req.params.matricule })
    .sort({ uploadedAt: -1 });

  res.json({ success: true, files });
});

// 🗑️ Supprimer fichier
router.delete("/:id", async (req, res) => {
  await Fichier.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

module.exports = router;
