const express = require("express");
const router = express.Router()
const multer= require ('../middleware/multer-config')
const path = require ('path')

const sauceCtrl = require('../controllers/sauce')

router.get('/', sauceCtrl.getAllSauces)
// router.get("/:id", sauceCtrl.XXX)
router.post("/", multer, sauceCtrl.createSauce)
// router.put("/:id", sauceCtrl.XXX)
// router.delete("/:id", sauceCtrl.XXX)



module.exports = router