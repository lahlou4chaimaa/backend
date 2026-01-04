const mongoose = require("mongoose");
const Etudiant = require("../models/Etudiant");

const etudiants = [
  {
    matricule: "E001",
    nom: "Alami",
    prenom: "Fatima",
    email: "fatima.alami@emsi.ma",
    password: "password123",
    filiere: "Génie Logiciel",
    annee: 3,
    actif: true,
    bio: "Passionnée par le développement web"
  },
  {
    matricule: "E002",
    nom: "Benjelloun",
    prenom: "Youssef",
    email: "youssef.benjelloun@emsi.ma",
    password: "password123",
    filiere: "Cybersécurité",
    annee: 2,
    actif: true,
    bio: "Futur expert en sécurité informatique"
  },
  {
    matricule: "E003",
    nom: "Chakir",
    prenom: "Sara",
    email: "sara.chakir@emsi.ma",
    password: "password123",
    filiere: "Data Science",
    annee: 1,
    actif: true,
    bio: "Amoureuse des données et de l'IA"
  },
  {
    matricule: "E004",
    nom: "Elhaddad",
    prenom: "Omar",
    email: "omar.elhaddad@emsi.ma",
    password: "password123",
    filiere: "Réseaux & Télécoms",
    annee: 4,
    actif: true,
    bio: "Expert en infrastructure réseau"
  },
  {
    matricule: "E005",
    nom: "Fassi",
    prenom: "Imane",
    email: "imane.fassi@emsi.ma",
    password: "password123",
    filiere: "Génie Logiciel",
    annee: 2,
    actif: true,
    bio: "Développeuse full-stack en devenir"
  }, 
  {
  matricule: "E006",
  nom: "Karimi",
  prenom: "Anas",
  email: "anas.karimi@emsi.ma",
  password: "password123",
  filiere: "IFA",
  annee: 1,
  actif: true,
  bio: "Intéressé par le développement mobile"
},
{
  matricule: "E007",
  nom: "Zerouali",
  prenom: "Hajar",
  email: "hajar.zerouali@emsi.ma",
  password: "password123",
  filiere: "IFA",
  annee: 2,
  actif: true,
  bio: "Passionnée par les bases de données"
},
{
  matricule: "E008",
  nom: "Amrani",
  prenom: "Soufiane",
  email: "soufiane.amrani@emsi.ma",
  password: "password123",
  filiere: "IFA",
  annee: 3,
  actif: true,
  bio: "Aime la programmation orientée objet"
},
{
  matricule: "E009",
  nom: "Bennani",
  prenom: "Meryem",
  email: "meryem.bennani@emsi.ma",
  password: "password123",
  filiere: "IFA",
  annee: 4,
  actif: true,
  bio: "Spécialisée en systèmes d’information"
},
{
  matricule: "E010",
  nom: "Ouazzani",
  prenom: "Rachid",
  email: "rachid.ouazzani@emsi.ma",
  password: "password123",
  filiere: "IFA",
  annee: 2,
  actif: true,
  bio: "Motivé par le génie logiciel et l’architecture"
},

{
  matricule: "E011",
  nom: "El Idrissi",
  prenom: "Khadija",
  email: "khadija.elidrissi@emsi.ma",
  password: "password123",
  filiere: "Génie Civil",
  annee: 1,
  actif: true,
  bio: "Découvre le monde du bâtiment"
},
{
  matricule: "E012",
  nom: "Mansouri",
  prenom: "Ayoub",
  email: "ayoub.mansouri@emsi.ma",
  password: "password123",
  filiere: "Génie Civil",
  annee: 2,
  actif: true,
  bio: "Intéressé par la résistance des matériaux"
},
{
  matricule: "E013",
  nom: "Rahmani",
  prenom: "Salma",
  email: "salma.rahmani@emsi.ma",
  password: "password123",
  filiere: "Génie Civil",
  annee: 3,
  actif: true,
  bio: "Passionnée par les structures en béton"
},
{
  matricule: "E014",
  nom: "Tahiri",
  prenom: "Mehdi",
  email: "mehdi.tahiri@emsi.ma",
  password: "password123",
  filiere: "Génie Civil",
  annee: 4,
  actif: true,
  bio: "Orienté gestion de chantier"
},
{
  matricule: "E015",
  nom: "Boukili",
  prenom: "Nour",
  email: "nour.boukili@emsi.ma",
  password: "password123",
  filiere: "Génie Civil",
  annee: 2,
  actif: true,
  bio: "S’intéresse aux travaux publics"
},

{
  matricule: "E016",
  nom: "Chraibi",
  prenom: "Othmane",
  email: "othmane.chraibi@emsi.ma",
  password: "password123",
  filiere: "Informatique",
  annee: 1,
  actif: true,
  bio: "Débute en programmation"
},
{
  matricule: "E017",
  nom: "Lahlou",
  prenom: "Chaimaa",
  email: "chaimaa.lahlou@emsi.ma",
  password: "password123",
  filiere: "Informatique",
  annee: 3,
  actif: true,
  bio: "Développement web et projets académiques"
},
{
  matricule: "E018",
  nom: "Skalli",
  prenom: "Hamza",
  email: "hamza.skalli@emsi.ma",
  password: "password123",
  filiere: "Informatique",
  annee: 2,
  actif: true,
  bio: "Aime les algorithmes et le C++"
},
{
  matricule: "E019",
  nom: "Najib",
  prenom: "Ikram",
  email: "ikram.najib@emsi.ma",
  password: "password123",
  filiere: "Informatique",
  annee: 4,
  actif: true,
  bio: "Orientée IA et machine learning"
},
{
  matricule: "E020",
  nom: "Ait Lahcen",
  prenom: "Bilal",
  email: "bilal.aitlahcen@emsi.ma",
  password: "password123",
  filiere: "Informatique",
  annee: 2,
  actif: true,
  bio: "Développement backend avec Node.js"
}, 
{
  matricule: "E021",
  nom: "Belkacem",
  prenom: "Amine",
  email: "amine.belkacem@emsi.ma",
  password: "password123",
  filiere: "IFA",
  annee: 1,
  actif: true,
  bio: "Découvre les systèmes d’information"
},
{
  matricule: "E022",
  nom: "Haddou",
  prenom: "Nawal",
  email: "nawal.haddou@emsi.ma",
  password: "password123",
  filiere: "IFA",
  annee: 2,
  actif: true,
  bio: "Intéressée par l’analyse fonctionnelle"
},
{
  matricule: "E023",
  nom: "Kabbaj",
  prenom: "Ismail",
  email: "ismail.kabbaj@emsi.ma",
  password: "password123",
  filiere: "IFA",
  annee: 3,
  actif: true,
  bio: "Passionné par l’architecture SI"
},
{
  matricule: "E024",
  nom: "Lemrabet",
  prenom: "Siham",
  email: "siham.lemrabet@emsi.ma",
  password: "password123",
  filiere: "IFA",
  annee: 4,
  actif: true,
  bio: "Orientation ERP et gestion des processus"
},
{
  matricule: "E025",
  nom: "Qadiri",
  prenom: "Yahya",
  email: "yahya.qadiri@emsi.ma",
  password: "password123",
  filiere: "IFA",
  annee: 2,
  actif: true,
  bio: "Aime la modélisation UML"
},

{
  matricule: "E026",
  nom: "Berrada",
  prenom: "Hind",
  email: "hind.berrada@emsi.ma",
  password: "password123",
  filiere: "Génie Civil",
  annee: 1,
  actif: true,
  bio: "Intéressée par le dessin technique"
},
{
  matricule: "E027",
  nom: "Chafik",
  prenom: "Adil",
  email: "adil.chafik@emsi.ma",
  password: "password123",
  filiere: "Génie Civil",
  annee: 2,
  actif: true,
  bio: "Apprécie la mécanique des sols"
},
{
  matricule: "E028",
  nom: "El Amrani",
  prenom: "Rania",
  email: "rania.elamrani@emsi.ma",
  password: "password123",
  filiere: "Génie Civil",
  annee: 3,
  actif: true,
  bio: "Spécialisée en structures métalliques"
},
{
  matricule: "E029",
  nom: "Fouad",
  prenom: "Zakaria",
  email: "zakaria.fouad@emsi.ma",
  password: "password123",
  filiere: "Génie Civil",
  annee: 4,
  actif: true,
  bio: "Gestion et planification de chantier"
},
{
  matricule: "E030",
  nom: "Laouini",
  prenom: "Imad",
  email: "imad.laouini@emsi.ma",
  password: "password123",
  filiere: "Génie Civil",
  annee: 2,
  actif: true,
  bio: "Intéressé par les travaux routiers"
},
{
  matricule: "E031",
  nom: "Ait Lahcen",
  prenom: "Achraf",
  email: "achraf.aitlahcen@emsi.ma",
  password: "password123",
  filiere: "IFA",
  annee: 2,
  actif: true,
  bio: "Intéressé par l’analyse des systèmes"
},
{
  matricule: "E032",
  nom: "Lafnoun",
  prenom: "Ayman",
  email: "ayman.lafnoun@emsi.ma",
  password: "password123",
  filiere: "IFA",
  annee: 1,
  actif: true,
  bio: "Débute en informatique de gestion"
},
{
  matricule: "E033",
  nom: "Bouichnad",
  prenom: "Hanaa",
  email: "hanaa.bouichnad@emsi.ma",
  password: "password123",
  filiere: "IFA",
  annee: 3,
  actif: true,
  bio: "Passionnée par les bases de données"
},
{
  matricule: "E034",
  nom: "Ezzahraoui",
  prenom: "Mehdi",
  email: "mehdi.ezzahraoui@emsi.ma",
  password: "password123",
  filiere: "IFA",
  annee: 4,
  actif: true,
  bio: "Orientation systèmes d’information décisionnels"
},
{
  matricule: "E035",
  nom: "Wardi",
  prenom: "Anas",
  email: "anas.wardi@emsi.ma",
  password: "password123",
  filiere: "IFA",
  annee: 2,
  actif: true,
  bio: "Aime la modélisation UML"
},

{
  matricule: "E036",
  nom: "Lahlou",
  prenom: "Adam",
  email: "adam.lahlou@emsi.ma",
  password: "password123",
  filiere: "Génie Civil",
  annee: 1,
  actif: true,
  bio: "Découvre les bases du génie civil"
},
{
  matricule: "E037",
  nom: "Mekkaoui",
  prenom: "Mohammed",
  email: "mohammed.mekkaoui@emsi.ma",
  password: "password123",
  filiere: "Génie Civil",
  annee: 2,
  actif: true,
  bio: "Intéressé par la résistance des matériaux"
},
{
  matricule: "E038",
  nom: "Bencharki",
  prenom: "Abdellah",
  email: "abdellah.bencharki@emsi.ma",
  password: "password123",
  filiere: "Génie Civil",
  annee: 3,
  actif: true,
  bio: "Passionné par les structures en béton armé"
},
{
  matricule: "E039",
  nom: "Benchakroun",
  prenom: "Samia",
  email: "samia.benchakroun@emsi.ma",
  password: "password123",
  filiere: "Génie Civil",
  annee: 4,
  actif: true,
  bio: "Orientation gestion et suivi de chantier"
},
{
  matricule: "E040",
  nom: "El Jazzouli",
  prenom: "Abdesamad",
  email: "abdesamad.eljazzouli@emsi.ma",
  password: "password123",
  filiere: "Génie Civil",
  annee: 2,
  actif: true,
  bio: "Intéressé par les travaux publics"
},

{
  matricule: "E041",
  nom: "Aitali",
  prenom: "Rayane",
  email: "rayane.aitali@emsi.ma",
  password: "password123",
  filiere: "IFA",
  annee: 1,
  actif: true,
  bio: "Découvre les systèmes informatiques"
},
{
  matricule: "E042",
  nom: "Aboutahr",
  prenom: "Mala",
  email: "mala.aboutahr@emsi.ma",
  password: "password123",
  filiere: "IFA",
  annee: 2,
  actif: true,
  bio: "Intéressée par l’analyse fonctionnelle"
},
{
  matricule: "E043",
  nom: "Nabih",
  prenom: "Abir Raghad",
  email: "abir.nabih@emsi.ma",
  password: "password123",
  filiere: "IFA",
  annee: 3,
  actif: true,
  bio: "Apprécie la gestion des projets SI"
},
{
  matricule: "E044",
  nom: "Mrizeq",
  prenom: "Salma",
  email: "salma.mrizeq@emsi.ma",
  password: "password123",
  filiere: "Génie Civil",
  annee: 1,
  actif: true,
  bio: "Intéressée par le dessin technique"
},
{
  matricule: "E045",
  nom: "Baddou",
  prenom: "Oussama",
  email: "oussama.baddou@emsi.ma",
  password: "password123",
  filiere: "Génie Civil",
  annee: 3,
  actif: true,
  bio: "Passionné par les ouvrages d’art"
},
{
  matricule: "E046",
  nom: "El Hannak",
  prenom: "Badr",
  email: "badr.elhannak@emsi.ma",
  password: "password123",
  filiere: "Génie Civil",
  annee: 4,
  actif: true,
  bio: "Spécialisé en planification de chantier"
}


];

async function seedDatabase() {
  try {
    await mongoose.connect("mongodb://localhost:27017/emsi_db");
    console.log("✅ Connecté à MongoDB");

    // Supprimer les anciennes données
    await Etudiant.deleteMany({});
    console.log("🗑️  Anciennes données supprimées");

    // Insérer les nouveaux étudiants
    await Etudiant.insertMany(etudiants);
    console.log("✅ Étudiants insérés avec succès");

    console.log("\n📝 Comptes de test créés:");
    etudiants.forEach(e => {
      console.log(`   ${e.email} / password123`);
    });

    mongoose.connection.close();
  } catch (err) {
    console.error("❌ Erreur:", err);
    process.exit(1);
  }
}

seedDatabase();