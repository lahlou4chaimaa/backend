const express = require("express");
const router = express.Router();
const Etudiant = require("../models/Etudiant");

// Rechercher des étudiants
router.get("/search", async (req, res) => {
  try {
    const { query, filiere, annee } = req.query;
    
    let filter = { actif: true };
    
    if (query) {
      filter.$or = [
        { nom: { $regex: query, $options: 'i' } },
        { prenom: { $regex: query, $options: 'i' } },
        { email: { $regex: query, $options: 'i' } }
      ];
    }
    
    if (filiere) filter.filiere = filiere;
    if (annee) filter.annee = parseInt(annee);

    const etudiants = await Etudiant.find(filter)
      .select('-password')
      .limit(20);

    res.json({ etudiants });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur lors de la recherche" });
  }
});

// Obtenir le profil d'un étudiant
router.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    
    const etudiant = await Etudiant.findById(userId)
      .select('-password')
      .populate('followers', 'nom prenom avatar filiere')
      .populate('following', 'nom prenom avatar filiere');

    if (!etudiant) {
      return res.status(404).json({ message: "Étudiant introuvable" });
    }

    res.json({ etudiant });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur lors de la récupération du profil" });
  }
});

// Mettre à jour le profil
router.put("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const { bio, avatar } = req.body;

    const etudiant = await Etudiant.findByIdAndUpdate(
      userId,
      { bio, avatar },
      { new: true }
    ).select('-password');

    res.json({ message: "Profil mis à jour", etudiant });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur lors de la mise à jour" });
  }
});

// Follow/Unfollow un étudiant
router.post("/:userId/follow", async (req, res) => {
  try {
    const { userId } = req.params;
    const { currentUserId } = req.body;

    if (userId === currentUserId) {
      return res.status(400).json({ message: "Vous ne pouvez pas vous suivre vous-même" });
    }

    const userToFollow = await Etudiant.findById(userId);
    const currentUser = await Etudiant.findById(currentUserId);

    if (!userToFollow || !currentUser) {
      return res.status(404).json({ message: "Utilisateur introuvable" });
    }

    const isFollowing = currentUser.following.includes(userId);

    if (isFollowing) {
      // Unfollow
      currentUser.following = currentUser.following.filter(
        id => id.toString() !== userId
      );
      userToFollow.followers = userToFollow.followers.filter(
        id => id.toString() !== currentUserId
      );
    } else {
      // Follow
      currentUser.following.push(userId);
      userToFollow.followers.push(currentUserId);
    }

    await currentUser.save();
    await userToFollow.save();

    res.json({ 
      message: isFollowing ? "Unfollowed" : "Followed",
      isFollowing: !isFollowing,
      followersCount: userToFollow.followers.length
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur lors du follow/unfollow" });
  }
});

// Obtenir les followers
router.get("/:userId/followers", async (req, res) => {
  try {
    const { userId } = req.params;
    
    const etudiant = await Etudiant.findById(userId)
      .populate('followers', 'nom prenom avatar filiere annee');

    if (!etudiant) {
      return res.status(404).json({ message: "Étudiant introuvable" });
    }

    res.json({ followers: etudiant.followers });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

// Obtenir les following
router.get("/:userId/following", async (req, res) => {
  try {
    const { userId } = req.params;
    
    const etudiant = await Etudiant.findById(userId)
      .populate('following', 'nom prenom avatar filiere annee');

    if (!etudiant) {
      return res.status(404).json({ message: "Étudiant introuvable" });
    }

    res.json({ following: etudiant.following });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

module.exports = router;