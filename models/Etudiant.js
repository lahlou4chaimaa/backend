const mongoose = require("mongoose");

const etudiantSchema = new mongoose.Schema({
  matricule: { type: String, required: true, unique: true },
  nom: { type: String, required: true },
  prenom: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  filiere: { type: String, required: true },
  annee: { type: Number, required: true },
  actif: { type: Boolean, default: true },
  bio: { type: String, default: "" },
  avatar: { type: String, default: "" },
  followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Etudiant' }],
  following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Etudiant' }],
  gameScores: {
    logique: { type: Number, default: 0 },
    math: { type: Number, default: 0 },
    memory: { type: Number, default: 0 },
    reflex: { type: Number, default: 0 }
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Etudiant", etudiantSchema);