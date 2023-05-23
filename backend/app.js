const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const userRoutes = require('./routes/user')
const sauceRoutes = require('./routes/sauce');
const path = require("path");


mongoose
  .connect(
    "mongodb+srv://fgp6opc:admin123456@cluster0.awyegk4.mongodb.net/?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch((err) => console.log("Connexion à MongoDB échouée  ! "+err ));

const app = express();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.use(bodyParser.json());

app.use('/images', express.static(path.join(__dirname, 'images')))

app.use('/api/auth', userRoutes);
app.use('/api/sauces', sauceRoutes)
 


module.exports = app;