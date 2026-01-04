const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  auteur: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Etudiant',
    required: true 
  },
  contenu: { type: String, default: "" },
  image: { type: String, default: "" },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Etudiant' }],
  commentaires: [{
    auteur: { type: mongoose.Schema.Types.ObjectId, ref: 'Etudiant' },
    texte: String,
    date: { type: Date, default: Date.now }
  }],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Post", postSchema);