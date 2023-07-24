// Importation de validator pour vérifier la conformité de l'email
const validator = require('validator');

module.exports = (req, res, next) => {
    const {email} = req.body

    if(validator.isEmail(email)) {
        console.log(`email valide ${validator.isEmail(email)}`);
        next()
    } else {
        return res
        .status(400)
        .json({error : `L'email ${email} n'est pas valide`})
    }
}