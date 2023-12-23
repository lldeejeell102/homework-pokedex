/////////////////////////////////////////////////////////////////////////////////////////////
// DEPENDENCIES
/////////////////////////////////////////////////////////////////////////////////////////////
require("dotenv").config()
require("./config/pokemon.js")
const express = require("express")
const morgan = require("morgan")
const methodOverride = require("method-override")
const pokemons = require("./config/pokemon.js")

// created app object
const app = express()
const { PORT = 3013 } = process.env;


/////////////////////////////////////////////////////////////////////////////////////////////
// MIDDLEWARE
/////////////////////////////////////////////////////////////////////////////////////////////
// morgan for debugging
app.use(morgan("dev"))
// to allow method overrides
app.use(methodOverride("_method"))
app.use(express.urlencoded({ extended: false }))



/////////////////////////////////////////////////////////////////////////////////////////////
// ROUTES
/////////////////////////////////////////////////////////////////////////////////////////////
// INDEX - Get
app.get("/pokemon", async (req, res) => {
    try {
        res.render("index.ejs", {pokemons})
    } catch (error) {
        res.send(error)
    }
})
// create a template for the data using the current data in pokemon.js then only rewrite what the inputs are. Also rewrite the ID by array.length+1
// make shallow duplicate ..array[0]



// NEW - Get
app.get("/pokemon/new", async (req, res) => {
    try{
        res.render("new.ejs")
    } catch(error) {
        res.send(error)
    }
})


// DESTORY - Delete

// UPDATE - Put

// CREATE - Post
app.post("/pokemon/new", async (req, res) => {
    try{
        // let newPokemon = await req.config.pokemon.create(req.body)
        // pokemons.push(newPokemon)
        // res.redirect("/pokemon")
        console.log(req.body)
        console.log(pokemons[0])
        res.redirect("/pokemon/new")
    }catch(error){
        res.send(error)
    }
})

// EDIT - Get

// SHOW - Get
app.get("/:id", (req, res) => {
    res.send("testing")
})
/////////////////////////////////////////////////////////////////////////////////////////////
// Listener
/////////////////////////////////////////////////////////////////////////////////////////////
app.listen(PORT, () => {
    console.log(`listening on port: ${PORT}`)
})