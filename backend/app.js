// Importation de express
const express = require('express');

//mise en place de plusieurs HTTP headers qui vont sécuriser l'appli
const helmet = require("helmet");

//empêche les attaques type bruteforce
const rateLimit = require("express-rate-limit");

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100
});

// Importation de  morgan (logger http)
const morgan = require('morgan');

// Importation connection base de donnée mongoDB
const mongoose = require('./database/db');

// Importation des routes
const userRoutes = require("./routes/user");
const sauceRoutes = require('./routes/sauce');

// Importation node.js utilitaire pour travailler avec les chemins de fichier
const path = require('path');

// Création de l'application express
const app = express();

app.use(helmet());
app.use("/api/", apiLimiter);

// Logger les requests et les responses
app.use(morgan('dev'));

// Debug mongoose
mongoose.set('debug', true); 

// Gérer les problemes de CORS (Cross-Origin Request Sharing)
// CORS : système de sécurité qui bloque par défaut les appels http entre les servers
app.use((req, res, next) => {
   
  // accéder à notre API depuis n'importe où
  res.setHeader('Access-Control-Allow-Origin', '*');

  res.setHeader("Cross-Origin-Resource-Policy", "cross-origin");

  // ajouter les headers sur nos réponses
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');

  // nous permet d'utiliser le CRUD
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

// Transformer le corps (body) en json objet javaScript utilisable
app.use(express.json());

// Route d'authenfication
app.use('/api/auth', userRoutes);

// Route sauce
app.use('/api/sauces', sauceRoutes);

// Route image
app.use("/images", express.static(path.join(__dirname, "images")));




// Exportation de app.js pour pouvoir y accéder depuis un autre fichier
module.exports = app;