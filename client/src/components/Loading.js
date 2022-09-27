import React from "react";
import {gif} from "./imagenes/Imagenes"
import styles from './Loading.module.css'

export default function Loading(){
    return(
        <div className={styles.bg}>
         <img src={gif} className={styles.gif} alt="no encontre la imagen" ></img>
        </div>
    )
}