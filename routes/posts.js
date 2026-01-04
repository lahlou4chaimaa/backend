const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const Post = require("../models/Post");

// Configuration Multer pour upload d'images
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9);
    cb(null, "post-" + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|gif/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(new Error("Seules les images sont autorisées"));
  }
});

// Créer un post
router.post("/", upload.single('image'), async (req, res) => {
  try {
    console.log("📦 Body:", req.body);
    console.log("🖼️ File:", req.file);
    
    const { auteur, contenu } = req.body;

    if (!auteur) {
      return res.status(400).json({ message: "Auteur requis" });
    }

    const post = new Post({
      auteur,
      contenu: contenu || "",
      image: req.file ? `/uploads/${req.file.filename}` : ""
    });

    await post.save();
    
    const postComplet = await Post.findById(post._id)
      .populate('auteur', 'nom prenom avatar');

    res.status(201).json({ 
      message: "Post créé avec succès", 
      post: postComplet 
    });
  } catch (err) {
    console.error("❌ Erreur:", err);
    res.status(500).json({ message: "Erreur lors de la création du post" });
  }
});

// Obtenir les posts
router.get("/", async (req, res) => {
  try {
    let posts = await Post.find()
      .populate('auteur', 'nom prenom avatar filiere')
      .populate('commentaires.auteur', 'nom prenom avatar')
      .sort({ createdAt: -1 })
      .limit(20);

    res.json({ posts });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur lors de la récupération des posts" });
  }
});

// Ajouter un like
router.post("/:postId/like", async (req, res) => {
  try {
    const { postId } = req.params;
    const { userId } = req.body;

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post introuvable" });
    }

    const alreadyLiked = post.likes.includes(userId);
    
    if (alreadyLiked) {
      post.likes = post.likes.filter(id => id.toString() !== userId);
    } else {
      post.likes.push(userId);
    }

    await post.save();
    
    res.json({ 
      message: alreadyLiked ? "Like retiré" : "Post liké",
      likes: post.likes.length,
      isLiked: !alreadyLiked
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur lors du like" });
  }
});

// Ajouter un commentaire
router.post("/:postId/comment", async (req, res) => {
  try {
    const { postId } = req.params;
    const { userId, texte } = req.body;

    if (!texte || texte.trim() === "") {
      return res.status(400).json({ message: "Commentaire vide" });
    }

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post introuvable" });
    }

    post.commentaires.push({
      auteur: userId,
      texte: texte.trim()
    });

    await post.save();
    
    const postUpdated = await Post.findById(postId)
      .populate('commentaires.auteur', 'nom prenom avatar');

    res.json({ 
      message: "Commentaire ajouté",
      commentaires: postUpdated.commentaires
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur lors de l'ajout du commentaire" });
  }
});

// Supprimer un post
router.delete("/:postId", async (req, res) => {
  try {
    const { postId } = req.params;
    const { userId } = req.body;

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post introuvable" });
    }

    if (post.auteur.toString() !== userId) {
      return res.status(403).json({ message: "Non autorisé" });
    }

    await Post.findByIdAndDelete(postId);
    res.json({ message: "Post supprimé avec succès" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur lors de la suppression" });
  }
});

module.exports = router;