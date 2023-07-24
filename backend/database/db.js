// Importer le package pour utiliser les variables d'environnement
const dotenv = require('dotenv');
const result = dotenv.config();

// Importer mongoose pour me connecter à la base de donnée mongoDB
const mongoose = require('mongoose');
mongoose.connect(
    process.env.SECRET_DB,
    {useNewUrlParser: true,
    useUnifiedTopology: true})
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

module.exports = mongoose;
module.exports = mongoose;