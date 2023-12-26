/////////////////////////////////////////////////////////////////////////////////////////////
// DEPENDENCIES
/////////////////////////////////////////////////////////////////////////////////////////////
require("dotenv").config()
require("./config/pokemon.js")
const express = require("express")
const morgan = require("morgan")
const methodOverride = require("method-override")
const pokemons = require("./config/pokemon.js")
const pokemon = require("./config/pokemon.js")

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
        console.log(pokemons.length)
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
        // const newPokemonName = req.body.name
        const newPokemonName = req.body.name
        const newPokemonPicture = req.body.picture
        const newPokemonType = req.body.type
        let newPokemonData = 
        {
            id: pokemons[0].id, 
            name: pokemons[0].name,
            img: pokemons[0].img,
            type: pokemons[0].type
        }
        newPokemonData.id = pokemons.length++
        newPokemonData.name = newPokemonName
        newPokemonData.img = newPokemonPicture
        newPokemonData.type = newPokemonType
        pokemon.push(newPokemonData)
        let removed = pokemon.pop()
        console.log(removed)
        // console.log(req.body.name)
        // console.log(req.body.picture)
        // console.log(req.body.type)
        res.redirect("/pokemon")
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