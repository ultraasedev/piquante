// Multer : pour gérer les requêtes HTTP avec envoie de fichier

// Importation de multer
const multer = require("multer");

const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
};

// Destination du fichier (répertoire) et générer un nom de fichier unique
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "images");
  },
  //modification du nom de fichier
  //nom d'origine +  date précise (avec Date.now)pour éviter tout doublon
  //extension selon constante MIME_TYPES
  filename: (req, file, callback) => {
    // Supprimer les espaces dans le nom du fichier
    const name = file.originalname.split(".")[0];
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + "." + extension);
  },
});

module.exports = multer({ storage: storage }).single("image");