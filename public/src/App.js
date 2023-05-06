import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Footer from './components/Footer'
import Cards from './pages/Cards'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Settings from './pages/Settings'
import Recepies from './pages/Recepies'
import Register from './pages/Register'
import 'react-toastify/dist/ReactToastify.css'
import Login from './pages/Login'
import Pizza from './pages/Pizza'
import RecipeList from './pages/Allrecette'
import Recipe from './pages/RecipeDetails'
import UpdateRecipe from './pages/UpdateRecipe'
import RecipeSearch from './pages/search.js'
import RecipeForm from './pages/ReciepeForm'
import Favorites from './pages/Favorites'

function App() {
    return (
        <Router>
            <Navbar />
            <div className="container main">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/recipes" element={<Recepies />} />
                    <Route path="/settings" element={<Settings />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/logout" element={<Cards />} />
                    <Route path="/pizza" element={<Pizza />} />
                    <Route path="/save" element={<RecipeForm />} />
                    <Route path="/allrecettes" element={<RecipeList />} />
                    <Route path="/getOne/:id" element={<Recipe />} />
                    <Route path="/update/:id" element={<UpdateRecipe />} />
                    <Route path="/search" element={<RecipeSearch />} />
                    <Route path="/getfavourite" element={<Favorites />} />
                </Routes>
            </div>
            <Footer />
        </Router>
    )
}

export default App
