const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const authRoutes = require('./routes/authRoutes')
const cookieParser = require('cookie-parser')
const recette = require('./routes/recRoutes')
const Recette = require('./model/Recette')
const app = express()
const session = require('express-session')
const Favorite = require('./model/favourite')
const { ObjectId } = require('mongodb')

app.use('/uploads', express.static('./uploads'))

// Set up session middleware

app.use(
    session({
        secret: 'kishan sheth super secret key',
        resave: false,
        saveUninitialized: true,
        cookie: { secure: true }
    })
)

const requireLogin = (req, res, next) => {
    if (!req.session.userId) {
        res.redirect('/login')
    } else {
        next()
    }
}

app.listen(4000, (err) => {
    if (err) {
        console.log(err)
    } else {
        console.log('Server Started Successfully.')
    }
})

mongoose
    .connect('mongodb://127.0.0.1:27017/jwt1', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log('DB Connetion Successfull')
    })
    .catch((err) => {
        console.log(err.message)
    })

app.use(
    cors({
        origin: ['http://localhost:3000'],
        methods: ['GET', 'POST', 'DELETE', 'PUT'],
        credentials: true
    })
)
app.use(cookieParser())

app.use(express.json())
app.use('/', authRoutes)
app.use('/api', recette)

app.get('/allrecettes', (req, res) => {
    Recette.find({})
        .then((data) => {
            res.json(data)
        })
        .catch((err) => {
            console.error(err)
            res.status(500).send('An error occurred while retrieving the recipes.')
        })
})

app.get('/search', async (req, res) => {
    try {
        const searchQuery = req.query.q
        const recipes = await Recette.find({
            name: { $regex: new RegExp(searchQuery, 'i') }
        })
        res.status(200).json(recipes)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})

app.post('/logout', (req, res) => {
    req.session.destroy()
})

// add recipe to favorites
app.post('/favorites/:recipeId', async (req, res) => {
    const recipeId = req.params.recipeId

    try {
        const reciepe = await Recette.find({}).exec()
        console.log(reciepe)

        const existingFavorite = await Favorite.findOne({ recipeId })
        if (existingFavorite) {
            res.status(409).send('Recipe already in favorites')
            return
        }

        const favorite = await Favorite.create({
            recipeId: recipeId,
            name: reciepe.name,
            ingredients: reciepe.ingredients,
            instructions: reciepe.instructions
        })
        res.status(200).json(favorite)
    } catch (error) {
        console.error(error)
    }
})

// Get all favorites

app.get('/getfavourite', (req, res) => {
    Favorite.find({})
        .then((data) => {
            res.json(data)
        })
        .catch((err) => {
            console.error(err)
            res.status(500).send('An error occurred while retrieving the recipes.')
        })
})
