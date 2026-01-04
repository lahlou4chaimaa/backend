const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const authRoutes = require("./routes/auth");
const postsRoutes = require("./routes/posts");
const filesRoutes = require("./routes/files");
const musicsRoutes = require('./routes/music');




const app = express();

// Middlewar
app.use(cors());
app.use(express.json());

// Servir les fichiers statiques (uploads)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api/tasks', require('./routes/tasks'));
// Connexion MongoDB
mongoose
  .connect("mongodb://localhost:27017/emsi_db", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("✅ MongoDB connecté avec succès"))
  .catch(err => {
    console.error("❌ Erreur connexion MongoDB:", err);
    process.exit(1);
  });

// Routes API (déclarées UNE SEULE FOIS)
app.use("/api/auth", authRoutes);
app.use("/api/posts", postsRoutes);
app.use("/api/files", filesRoutes);
app.use("/api/musics", musicsRoutes);


// Route de test
app.get("/", (req, res) => {
  res.json({ 
    message: "API EMSI - Authentification & Posts & Musiques", 
    status: "OK",
    routes: ["/api/auth", "/api/posts", "/api/files", "/api/musics"]
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Serveur lancé sur http://localhost:${PORT}`);
  console.log(`📁 Dossier uploads: ${path.join(__dirname, 'uploads')}`);
  console.log(`🎵 Route musiques: http://localhost:${PORT}/api/musics`);
});