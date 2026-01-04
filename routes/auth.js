const express = require("express");
const router = express.Router();
const Etudiant = require("../models/Etudiant");

// Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  console.log("📥 Tentative de connexion:", email);

  if (!email || !password) {
    console.log("❌ Champs manquants");
    return res.status(400).json({ 
      message: "Email et mot de passe requis",
      received: { email: !!email, password: !!password }
    });
  }

  if (!email.endsWith("@emsi.ma")) {
    console.log("❌ Email non EMSI:", email);
    return res.status(403).json({ 
      message: "Email doit être @emsi.ma",
      received: email 
    });
  }

  try {
    console.log("🔍 Recherche étudiant...");
    const etudiant = await Etudiant.findOne({ email });
    
    if (!etudiant) {
      console.log("❌ Étudiant introuvable pour:", email);
      return res.status(404).json({ 
        message: "Étudiant introuvable",
        suggestion: "Vérifiez votre email ou contactez l'administration"
      });
    }
    
    if (!etudiant.actif) {
      console.log("❌ Compte désactivé:", email);
      return res.status(403).json({ 
        message: "Compte désactivé",
        contact: "Contactez l'administration pour réactiver votre compte"
      });
    }
    
    console.log("🔑 Vérification mot de passe...");
    console.log("Mot de passe entré:", password);
    console.log("Mot de passe stocké:", etudiant.password);
    
    if (etudiant.password !== password) {
      console.log("❌ Mot de passe incorrect");
      return res.status(401).json({ 
        message: "Mot de passe incorrect",
        hint: "Le mot de passe est sensible à la casse"
      });
    }

    console.log("✅ Connexion réussie:", etudiant.prenom, etudiant.nom);

    res.json({
      success: true,
      message: "Connexion réussie",
      etudiant: {
        _id: etudiant._id,
        matricule: etudiant.matricule,
        nom: etudiant.nom,
        prenom: etudiant.prenom,
        email: etudiant.email,
        filiere: etudiant.filiere,
        annee: etudiant.annee,
        bio: etudiant.bio,
        avatar: etudiant.avatar
      }
    });
  } catch (err) {
    console.error("❌ Erreur serveur:", err);
    res.status(500).json({ 
      message: "Erreur serveur",
      error: err.message 
    });
  }
});

// Vérifier statut serveur
router.get("/status", (req, res) => {
  res.json({
    status: "online",
    timestamp: new Date().toISOString(),
    service: "EMSIAuth",
    version: "1.0.0"
  });
});

module.exports = router;