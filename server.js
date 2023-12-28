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
app.get("/pokemon", (req, res) => {
    try {
        res.render("index.ejs", {pokemons})
        // console.log(pokemons.length)
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
        newPokemonData.id = pokemons.length + 1
        newPokemonData.name = newPokemonName
        newPokemonData.img = newPokemonPicture
        newPokemonData.type = newPokemonType
        pokemons.push(newPokemonData)
        // let removed = pokemon.pop()
        // console.log(removed)
        console.log(newPokemonData.id)
        console.log(newPokemonData.name)
        // console.log(newPokemonData.picture)
        // console.log(newPokemonData.type)
        res.redirect("/pokemon")
    }catch(error){
        res.send(error)
    }
})


// DESTORY - Delete
app.delete("/pokemon/:id", (req,res) => {
    const id = req.params.id
    console.log(id)
    for (let i = 0; i < pokemons.length; i++){
        if(pokemons[i].id === id){
            pokemonDelete = pokemons[i]
            // console.log(pokemonDelete)
        }
    }
    console.log(pokemonDelete)
    pokemons.slice(pokemonDelete,1)
    res.redirect("/pokemon")
})

// EDIT - Get
app.get("/pokemon/:id/edit", (req, res) => {
    const id = req.params.id
    let pokemonsIndex = 0
    const body = req.body
    for (let i = 0; i < pokemons.length; i++){
        if(pokemons[i].id === id){
            pokemonsIndex = pokemons[i]
            // console.log(pokemons[i].damages)
        }
    }
    res.render("edit.ejs", {pokemonsIndex, body,id})
    // pokemons[id] = body
})

// UPDATE - Put
app.put("/pokemon/:id", (req,res) =>{
    const id = req.params.id
    const name = req.body.name
    const type = req.body.type
    for (let i = 0; i < pokemons.length; i++){
        if(pokemons[i].id === id){
            pokemonsIndex = pokemons[i]
        }
    }
    pokemonsIndex.name = name
    pokemonsIndex.type = type
    res.redirect("/pokemon")
})

// SHOW - Get
app.get("/pokemon/:id", (req, res) => {
    const id = req.params.id
    let name = ""
    let pokemonsIndex = 0
    for (let i = 0; i < pokemons.length; i++){
        if(pokemons[i].id === id){
            name = pokemons[i].name
            pokemonsIndex = pokemons[i]
            // console.log(pokemons[i].damages)
        }
    }
    res.render("show.ejs", {name, id, pokemonsIndex})
    // res.render("show.ejs", {name, id})
    // res.send()
})
/////////////////////////////////////////////////////////////////////////////////////////////
// Listener
/////////////////////////////////////////////////////////////////////////////////////////////
app.listen(PORT, () => {
    console.log(`listening on port: ${PORT}`)
})