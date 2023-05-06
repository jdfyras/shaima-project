const mongoose = require('mongoose')

const favoriteSchema = new mongoose.Schema({
    recipeId: String,
    name: String,
    ingredients: String,
    instructions: String
})
module.exports = mongoose.model('Favorite', favoriteSchema)
