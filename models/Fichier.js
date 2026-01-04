const mongoose = require("mongoose");

const fichierSchema = new mongoose.Schema({
  name: String,
  type: String,
  size: Number,
  url: String,

  filiere: String,
  year: String,
  groupe: String,
  category: String,

  uploadedBy: String, // nom + prénom
  matricule: String,

  uploadedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Fichier", fichierSchema);
