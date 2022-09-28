import React from "react";
import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux'
import { getPokemons, filterPokemonsByType, filterCreated, orderName } from "../actions";
import {Link} from "react-router-dom"
import styles from './Home.module.css'
import Paginado from "./Paginado";
import Cards from "./Cards/Cards";
import SearchBar from "./SearchBar";
import { landingImg } from "./imagenes/Imagenes";
import Loading from "./Loading";


export default function Home(){

    const dispatch = useDispatch()
    const allPokemons = useSelector((state)=> state.pokemons) 
    const [currentPage, setCurrentPage] = useState(1) //guardar y setear la pagina actual
    const [pokemonsPerPage, setPokemonsPerPage] = useState(12) //guardar y setear cuantos personajes pokemons quiero por pagina(12)
    const [order, setOrder] = useState("")
    const indexOffLastPkemon = currentPage * pokemonsPerPage 
    const indexOffFirstPkemon = indexOffLastPkemon - pokemonsPerPage 
    const currentPokemons = allPokemons.slice(indexOffFirstPkemon, indexOffLastPkemon)//agarra solo desde el indice del primero y el del ultimo en una pagina

    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    useEffect (()=>{
        dispatch(getPokemons());
    },[dispatch])

    function handleFilterType(e){
        dispatch(filterPokemonsByType(e.target.value))
        setCurrentPage(1)
    }
    function handleFilterCreated(e){
        dispatch(filterCreated(e.target.value))
        setCurrentPage(1)
    }
    const handleSort= (e) => {
        e.preventDefault()
        dispatch(orderName(e.target.value));
        paginado(1)
        setOrder(`Ordenado ${e.target.value}`)
        document.getElementById("input").value = "";
    }


    return(
        <div  className={styles.bg}>
            <link href="https://fonts.googleapis.com/css2?family=Roboto+Mono&display=swap" rel="stylesheet"></link>
            <link href= "http://fonts.cdnfonts.com/css/pokemon-solid" rel="hoja de estilo"></link>
            <link href=" http://fonts.cdnfonts.com/css/pokemon-hollow " rel="hoja de estilo"></link>
           
            <img src={landingImg} className={styles.image} alt="no encontre la imagen" ></img>
            <div className={styles.navBar}>
                <Link to='/pokemon'><button className={styles.boton}>Crear PoKeMoN</button></Link>
            
                <div className={styles.filtro}>
                    <select className={styles.boton} onChange={e => {handleSort(e)}}>
                        <option value="ord" disabled selected>Ordenar:</option>
                        <option value='asc'>Ascendente</option>
                        <option value='desc'>Descendente</option>
                        <option value="may">Mayor ataque</option>
                        <option value="men">Menos ataque</option>
                    </select>
                    <select className={styles.boton} onChange={e => handleFilterCreated(e)}>
                        <option value="all" disabled selected>Creación:</option>
                        <option value="todos">Todos</option>
                        <option value="created">Creados</option>
                        <option value="api">Existente</option>
                    </select>
                    <select className={styles.boton} onChange={e => {handleFilterType(e)}}>
                        <option value="todos" disabled selected>Tipo:</option>
                        <option value="todos">Todos</option>
                        <option value="normal">Normal</option>
                        <option value="fighting">Lucha</option>
                        <option value="flying">Volador</option>
                        <option value="posion">Posion</option>
                        <option value="ground">Terrestre</option>
                        <option value="rock">Roca</option>
                        <option value="bug">Insecto</option>
                        <option value="ghost">Fantasma</option>
                        <option value="steel">Acero</option>
                        <option value="fire">Fuego</option>
                        <option value="water">Agua</option>
                        <option value="grass">Cesped</option>
                        <option value="electric">Electrico</option>
                        <option value="psychic">Psiquico</option>
                        <option value="ice">Hielo</option>
                        <option value="dragon">Dragon</option>
                        <option value="dark">Oscuro</option>
                        <option value="fairy">Hada</option>
                        <option value="unknown">Desconocido</option>
                        <option value="shadow">Sombra</option>
                    </select>
                    
                    
                </div>
                <SearchBar/>
            </div>
                
            <Paginado
            pokemonsPerPage={pokemonsPerPage}
            allPokemons = {allPokemons.length}
            paginado = {paginado}
            />
            
                
            {!allPokemons.length 
                ? <Loading/> 
                : <Cards allPokemons={currentPokemons}/>           
            }
        </div>
    )
    
}