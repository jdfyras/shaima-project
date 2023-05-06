const TaskModel = require('../model/Recette')
const jwt = require('jsonwebtoken')
const Recette = require('../model/Recette')
const upload = require('../middlewares/upload')

const maxAge = 3 * 24 * 60 * 60
const createToken = (id) => {
    return jwt.sign({ id }, 'kishan sheth super secret key', {
        expiresIn: maxAge
    })
}

//Ajouter une recette
module.exports.saveTask = async (req, res) => {
    const { name, ingredients, instructions } = req.body
    if (!name || !ingredients || !instructions) {
        return res.status(400).json({ message: 'Please provide all required fields' })
    }

    try {
        const recette = await Recette.create({
            name: req.body.name,
            ingredients: req.body.ingredients,
            instructions: req.body.instructions,
            avatar: req.file ? req.file.filename : ''
        })

        res.status(201).json(recette)
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Error creating recipe' })
    }
}

//recupperer tous les recette

module.exports.getTasks = async (req, res) => {
    const tasks = await TaskModel.find()
    res.send(tasks)
}

module.exports.getRecipeById = (req, res) => {
    const id = req.params.id
    Recette.findById(id)
        .then((recipe) => {
            if (!recipe) {
                return res.status(404).json({ message: 'Recipe not found' })
            }
            res.json(recipe)
        })
        .catch((error) => res.status(400).json({ message: 'Error: ' + error }))
}

module.exports.deleteTask =
    ('/delete/:id',
    async (req, res) => {
        try {
            const deletedRecette = await Recette.findByIdAndDelete(req.params.id)
            if (!deletedRecette) {
                return res.status(404).json({ message: 'Recipe not found' })
            }
            res.status(200).json({ message: 'Recipe deleted successfully' })
        } catch (error) {
            console.log('eeeeeeeeeerrrrrrrrrrrrrrrue')
            res.status(400).json({ message: error.message })
        }
    })

module.exports.updateRecipe =
    ('/update/:id',
    async (req, res) => {
        try {
            const updatedRecette = await Recette.findByIdAndUpdate(
                req.params.id,
                { $set: req.body },
                { new: true }
            )
            res.status(200).json(updatedRecette)
        } catch (error) {
            res.status(400).json({ message: error.message })
            console.log('errrreur')
            console.log('eeeeeeeeeerrrrrrrrrrrrrrrue')
        }
    })
