// Importation de bcrypt
const bcrypt = require('bcrypt');

// Importation de crypto.js pour crypter l'email
const cryptojs = require('crypto-js');

// Importation de jsonwebtoken
const jwt = require('jsonwebtoken');

// Importation pour utilisation des variables d'environnements
const dotenv = require('dotenv');
const result = dotenv.config();

// Importation models de la base de donnée User.js
const User = require('../models/user');

// Signup pour enregistrer un nouvel utilisateur dans la base de donnée
exports.signup =(req, res, next) => {
       
    // Chiffrer l'email avant de l'envoyer dans la base de donnée
    const emailCryptoJs = cryptojs.HmacSHA256(req.body.email, `${process.env.CRYPTOJS_EMAIL}`).toString();
    
    // Hasher le mot de passe avant de l'envoyer dans la base donnée
    // Salt = 10 combien de fois l'algorythme sera éxécuté
    bcrypt.hash(req.body.password, 10) 
    .then((hash) => {
        // Ce qui va être enregistré dans MongoDB
        const user = new User({
            email : emailCryptoJs,
            password : hash
        });
    
        // Envoyer le user dans la base de donnée MongoDB
        user
            .save()
            .then(() =>
            res.status(201).json({ message : 'Utilisateur créé et sauvegardé'}))
            .catch((error) => res.status(400).json({error}).send());
    
    })

    .catch((error) => res.status(500).json({error}).send(console.log(error)));
};

// Login pour s'enregistrer
exports.login = (req, res, next) => {
    // Le contenu de la requête
   
    // Chiffrer l'email de la requête
    const emailCryptoJs = cryptojs.HmacSHA256(req.body.email, `${process.env.CRYPTOJS_EMAIL}`).toString();
        
    // Chercher si l'utilisateur est dans la base de donnée
    User.findOne({email:emailCryptoJs})
    // Si le mail utilisateur n'est pas présent
    .then((user) => {
        if(!user) {
            return res.status(400).json({error : 'Utilisateur non trouvé'})
        }
        
        // Controler la validité du password envoyer par le front
        bcrypt
        .compare(req.body.password, user.password)
        .then((ctrlPassword) => {
           
            // Si le mot de passe est incorrect
            if(!ctrlPassword) {
                return res.status(401).json({error : 'Le mot de passe est incorrect'})
            }

            // Le mot de passe est correct
            res.status(200).json({
                // Encodage du userId pour la création de nouveaux objets (objet et userId seront lié)
                userId: user._id,
                token: jwt.sign(
                    // 3 arguments
                    {userId: user._id},
                    `${process.env.JWT_KEY_TOKEN}`,
                    {expiresIn: '24h'}
                )
            })
        })
        .catch((error) => res.status(500).json({error}))
    })
    .catch((error) => res.status(500).json({error}));

};

    

    

    