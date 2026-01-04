const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Music = require('../models/Music');

console.log('🎵 Module music.js chargé');

// Configuration multer pour upload fichier
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + '-' + Math.round(Math.random() * 1E9) + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB max
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('audio/') || file.mimetype === 'video/mp4') {
      cb(null, true);
    } else {
      cb(new Error('Seulement les fichiers audio/vidéo'));
    }
  }
});

// 1. GET toutes les musiques ✅
router.get('/', async (req, res) => {
  console.log('📥 GET /api/musics - Récupération des musiques');
  try {
    const musics = await Music.find().sort({ createdAt: -1 }).limit(50);
    console.log(`✅ ${musics.length} musiques trouvées`);
    res.json({ success: true, musics });
  } catch (err) {
    console.error('❌ Erreur GET /api/musics:', err);
    res.status(500).json({ success: false, message: 'Erreur serveur' });
  }
});

// 2. POST ajouter musique par LIEN (YouTube/SoundCloud) ✅
router.post('/add-link', async (req, res) => {
  console.log('📥 POST /api/musics/add-link');
  console.log('📦 Body reçu:', req.body);
  
  try {
    const { title, description, url, uploadedBy } = req.body;
    
    if (!title || !url || !uploadedBy) {
      console.log('❌ Champs manquants:', { title: !!title, url: !!url, uploadedBy: !!uploadedBy });
      return res.status(400).json({ 
        success: false, 
        message: 'Champs obligatoires manquants',
        received: { title: !!title, url: !!url, uploadedBy: !!uploadedBy }
      });
    }

    const music = new Music({ title, description, url, uploadedBy });
    await music.save();
    
    console.log('✅ Musique créée:', music._id);
    res.json({ success: true, music });
  } catch (err) {
    console.error('❌ Erreur POST /api/musics/add-link:', err);
    res.status(500).json({ success: false, message: 'Erreur serveur', error: err.message });
  }
});

// 3. POST upload fichier audio ✅
router.post('/upload-file', upload.single('file'), async (req, res) => {
  console.log('📥 POST /api/musics/upload-file');
  console.log('📦 Fichier reçu:', req.file ? req.file.filename : 'AUCUN');
  
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'Aucun fichier reçu' });
    }

    const { title, description, uploadedBy } = req.body;
    if (!title || !uploadedBy) {
      return res.status(400).json({ success: false, message: 'Titre et uploadedBy requis' });
    }

    const url = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
    
    const music = new Music({ title, description, url, uploadedBy });
    await music.save();
    
    console.log('✅ Musique uploadée:', music._id);
    res.json({ success: true, music });
  } catch (err) {
    console.error('❌ Erreur POST /api/musics/upload-file:', err);
    res.status(500).json({ success: false, message: 'Erreur serveur' });
  }
});

// 4. DELETE une musique
router.delete('/:id', async (req, res) => {
  console.log('📥 DELETE /api/musics/' + req.params.id);
  try {
    const music = await Music.findByIdAndDelete(req.params.id);
    if (!music) {
      return res.status(404).json({ success: false, message: 'Musique non trouvée' });
    }
    console.log('✅ Musique supprimée:', req.params.id);
    res.json({ success: true, message: 'Musique supprimée' });
  } catch (err) {
    console.error('❌ Erreur DELETE:', err);
    res.status(500).json({ success: false, message: 'Erreur serveur' });
  }
});

console.log('✅ Routes musiques configurées: GET /, POST /add-link, POST /upload-file, DELETE /:id');

module.exports = router;