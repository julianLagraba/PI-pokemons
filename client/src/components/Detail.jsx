import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getDetail } from "../actions";
import { useDispatch, useSelector} from "react-redux"
import styles from "./Detail.module.css"
import Loading from "./Loading";

export default function Detail(props){
    const dispatch = useDispatch()
    const myPokemon = useSelector ((state) => state.detail)

    
    useEffect(()=>{
        dispatch(getDetail(props.match.params.id));
    },[dispatch])

    
    function handleBack(e){
        myPokemon.pop()
    }

    return (
        <div>
            {
                myPokemon.length>0 ?
                <div className={styles.bg}>
                    <link href="https://fonts.googleapis.com/css2?family=Roboto+Mono&display=swap" rel="stylesheet"></link>
                    <div className={styles.pokedex} >
                    <div className={styles.glass}>
                    
                    <h1>{myPokemon[0].nombre}</h1>
                    <img src ={myPokemon[0].img}  className={styles.pokeimage} alt="" width="300px" height="300px"></img>
                    <div className={styles.info}> 
                    <h3>Ataque: {myPokemon[0].ataque} </h3>
                    <h3>Defensa: {myPokemon[0].defensa}</h3>
                    <h3>Vida: {myPokemon[0].vida}</h3>
                    <h3>Velocidad: {myPokemon[0].velocidad}</h3>
                    <h3>Altura: {(myPokemon[0].altura)/10}m</h3>
                    <h3>Peso: {myPokemon[0].peso}g</h3>
                    <h3>Tipos: {myPokemon[0].tipos.map(e=>e.nombre+ " ")} </h3>
                    </div>
                        <Link to= "/home">
                        <button className={styles.button} onClick={handleBack}>Volver a inicio</button>
                        </Link>
          </div>
          </div>
         
                </div>:
                <div></div>
            }
          <Loading/>
        </div>
    )
}