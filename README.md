
Backend API pour l'espace étudiants EMSI Casablanca. Authentification, posts sociaux, partage fichiers/cours, musique, mini-jeux avec classements, profils étudiants.

✨ Fonctionnalités
🔐 Auth EMSI (email @emsi.ma + 40+ étudiants seedés)

📱 Posts sociaux (likes, commentaires, images)

📚 Partage fichiers (cours par filière/groupe)

🎵 Musique (upload fichiers + liens YouTube)

🕹️ Mini-jeux (logique/math/memory/réflexes + classements)

👥 Profils étudiants (follow/unfollow, recherche)

🗃️ Base EMSI (Génie Logiciel, IFA, Génie Civil, etc.)

🛠️ Stack Technique
Backend	Base	Upload	Autres
Node.js, Express	MongoDB, Mongoose	Multer	CORS, JSON parsing
🚀 Installation & Démarrage
bash
# Clone & install
git clone https://github.com/tonusername/emsi-space-api.git
cd emsi-space-api
npm install

# Seed DB (40+ étudiants EMSI)
node scripts/seed.js

# Lancer dev server
npm run dev  # ou node server.js

# API prête : http://localhost:5000
Prérequis :

Node.js ≥ 18

MongoDB local (mongod) ou Atlas

Dossier uploads/ (créé auto)

📋 Endpoints Principaux
Route	Méthode	Description	Auth
/	GET	Status API + routes	Non
/api/auth/login	POST	Login EMSI (email/password)	Non
/api/posts	GET/POST	Posts (avec images)	Non
/api/posts/:id/like	POST	Like/unlike	Oui
/api/posts/:id/comment	POST	Commenter	Oui
/api/files/:matricule	GET	Fichiers de l'étudiant	Non
/api/files/upload	POST	Upload cours/fichiers	Non
/api/musics	GET/POST/DELETE	Musiques (fichiers/liens)	Non
/api/users/search	GET	Recherche étudiants	Non
/api/games/leaderboard/:type	GET	Classement jeux	Non
/uploads/*	GET	Fichiers statiques	Non
Exemple Login (curl) :

bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"fatima.alami@emsi.ma","password":"password123"}'
🧪 Données de Test (Seed)
40+ étudiants EMSI réels :

text
fatima.alami@emsi.ma / password123 (Génie Logiciel 3e)
youssef.benjelloun@emsi.ma / password123 (Cybersécu 2e)
sara.chakir@emsi.ma / password123 (Data Science 1e)
... (voir seed.js pour tous)
Filières : Génie Logiciel, IFA, Génie Civil, Informatique, etc.

📁 Structure du Projet
text
emsi-space-api/
├── server.js          # Serveur principal
├── models/            # Schémas MongoDB
│   ├── Etudiant.js
│   ├── Post.js
│   ├── Fichier.js
│   └── Music.js
├── routes/            # API routes
│   ├── auth.js
│   ├── posts.js
│   ├── files.js
│   ├── musics.js
│   ├── users.js
│   └── games.js
├── scripts/
│   └── seed.js        # Données test
├── uploads/           # Fichiers uploadés
└── package.json
🚀 Déploiement
Render.com (Gratuit/Recommandé) :
Build: npm install
Start: node server.js
Env: MONGODB_URI=mongodb+srv://... (Atlas)
Autres : Railway, Heroku, DigitalOcean.

🤝 Contribution
Fork → git clone tonfork

npm install → Créer branche feature/nom

Code → Tests → git push → PR

Guidelines : ESLint, commits clairs, 80%+ coverage.

📄 License
MIT - Free pour usage EMSI/projets perso.

👨‍💻 Développé par Lahlou Chaimaa , EMSI Casablanca
LinkedIn : https://www.linkedin.com/in/chaimaa-lahlou-63272a331/

⭐ Star si utile pour la promo EMSI ! 🚀
