const { Router } = require('express');
const axios = require("axios");
const { Pokemon, Tipo } = require('../db');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const router = Router();

const getApiInfo = async () => {
    try {
        const url = 'https://pokeapi.co/api/v2/pokemon?offset=0&limit=40';
        let allPokemones = await axios.get(url);
        allPokemones = allPokemones.data.results

        let pokemonInfo = await Promise.all(allPokemones.map(async el => {
            let pokemonDetail = await axios.get(el.url);
            return {
                id: pokemonDetail.data.id,
                nombre: pokemonDetail.data.name,

                tipos: pokemonDetail.data.types.map(el => {
                    return ({
                       nombre: el.type.name
                    })
                }),
                img: pokemonDetail.data.sprites.other.home.front_default,
                vida: pokemonDetail.data.stats[0].base_stat,
                ataque: pokemonDetail.data.stats[1].base_stat,
                defensa: pokemonDetail.data.stats[2].base_stat,
                velocidad: pokemonDetail.data.stats[3].base_stat,
                altura: pokemonDetail.data.height,
                peso: pokemonDetail.data.weight
            }
        }))
        return pokemonInfo;
    
    } catch (error) {
        console.log(error);
    }
}

const getDBInfo = async () => {
    return await Pokemon.findAll({
        include: {
            model: Tipo,
            attributes: ['nombre', "id"],
            troguh: {
                attributes: [],
            }
        }
    })
}

const getAllPokemones = async () => {
    const apiInfo = await getApiInfo();
    const dbInfo = await getDBInfo();
    const infoTotal = apiInfo.concat(dbInfo)
    return infoTotal;
}

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get("/pokemons", async (req, res) =>{
    const nombre = req.query.name;
    let todosLosPokemones = await getAllPokemones();
    if(nombre) {
        let pokemonName = todosLosPokemones.filter(el => el.nombre.toLowerCase().includes(nombre.toLowerCase()))
        if(pokemonName.length){
            res.status(200).send(pokemonName);
        } else {
            res.status(400).send('No existe ese pokemon');
        }
    } else {
        res.status(200).send(todosLosPokemones);
    }
})

router.get("/types", async (req, res) => {

    let tipos = await Tipo.findAll();
    res.status(200).send(tipos);
    /*const url = 'https://pokeapi.co/api/v2/type';
    let tiposAPI = await axios.get(url);

    res.status(200).send(tiposAPI.data.results.map(el => {
        return ({
            NombreDelTipo: el.nombre
        })
    }))*/
})

router.get('/pokemons/:idPokemon', async (req, res, next) => {
    let idPokemon = req.params.idPokemon;
console.log(req.params)
    let todosLosPokemones = await getAllPokemones();
    if(idPokemon) {
        let pokemon = todosLosPokemones.filter(el => el.id == idPokemon)
        if(pokemon) {
            res.status(200).send(pokemon);
        } else{
            next({status:404, message:'no existe pokemon con ese ID'})
        }
    }
})

router.post('/pokemons', async (req, res, next)=>{
    try{
    const {
        nombre,
        tipos ,
        vida,
        ataque,
        defensa,
        velocidad,
        altura,
        peso,
        img
    } = req.body

    const [pokemon, created] = await Pokemon.findOrCreate({
        where: {nombre},
        defaults:{
            nombre,
            vida,
            ataque,
            defensa,
            velocidad,
            altura,
            peso,
            img
        }  
    })
    if(created){
        pokemon.setTipos(tipos)
    }
    res.status(200).json({created, pokemon})
    }
    catch(err){next(err)}
})

module.exports = router;
