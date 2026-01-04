const mongoose = require('mongoose');

const musicSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  url: { type: String, required: true },
  uploadedBy: { type: String, required: true }, // matricule de l'étudiant
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Music', musicSchema, 'musics');
