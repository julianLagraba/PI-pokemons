import React from "react";
import { Link } from "react-router-dom";
import styles from './LandingPage.module.css' 
import { landingImg } from "./imagenes/Imagenes";

export default function LandingPage(){
    return(
        
        <div className={styles.bg}>
            <link href=" http://fonts.cdnfonts.com/css/pokemon-hollow " rel="hoja de estilo"></link>
                <div className={styles.titulo}>
                <img src={landingImg} className={styles.image} alt="no encontre la imagen" ></img>
                </div>
                <div className={styles.container}>
                <Link to='/home'>
                    <button className={styles.bt}><div className={styles.intro}></div></button>
                </Link>
            </div>
        </div>
    )
}