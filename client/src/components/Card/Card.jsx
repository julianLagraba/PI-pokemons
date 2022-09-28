import React from "react";
import { Link } from "react-router-dom";
import styles from "./Card.module.css"

export default function PokeCard({id, nombre,types, attack, img}){
    return(
        <Link to={`/pokemon/${id}`} className={styles.Card}>

                <img className={styles.img} src= {img} alt="img not found"/> 
                <h3>{nombre}</h3>
                <h5>{types?.map((e) => {return (e.name + " ")}) } Ataque: {attack} </h5>
                {/*<h5>Ataque: {attack}</h5>*/}
                
        </Link>
    )
}