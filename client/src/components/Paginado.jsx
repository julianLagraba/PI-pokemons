import React from "react";
import styles from './Paginado.module.css'

export default function Paginado({pokemonsPerPage, allPokemons, paginado}){ //declaro mi paginado y me traigo las propiedades
    const pageNumber = []

    for(let i=1; i<= Math.ceil(allPokemons/pokemonsPerPage); i++){ //recorro y tomo el numero redondo q resulta de dividir todos los pokemons por los pokemons por pagina que yo quiero
        pageNumber.push(i)  
    }
    return(
        <div className={styles.paginado}>
        <nav className={styles.navpaginado}>
            <ul className="paginado">
                {pageNumber &&
                pageNumber.map(number =>(  //si tengo ese areglo lo mapeo y devolveme cada uno de los numeros q devuelva el paginado
                    <li className="number" key={number}>
                    <a onClick={()=> paginado(number)}>{number}</a> 
                    </li>
                ))}
            </ul>
        </nav>
        </div>
    )
}