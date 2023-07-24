// Importations
const express = require('express');

// Importation du controllers/user.js
const sauceCtrl = require('../controllers/sauce');

// Importation du middleware d'authentification
const auth = require('../middleware/auth');

// Importation du middleware multer pour la gestion des images
const multer = require('../middleware/multer-config');


// La fonction Router()
const router = express.Router();

// Les routes
router.get("/",auth, sauceCtrl.getAllSauces);
router.post("/", auth, multer, sauceCtrl.createSauce);
router.put("/:id", auth, multer, sauceCtrl.modifySauce);
router.get("/:id", auth, sauceCtrl.getOneSauce);
router.delete("/:id", auth, sauceCtrl.deleteSauce);
router.post("/:id/like", auth, sauceCtrl.noteSauce);


// Exportation du module
module.exports = router;