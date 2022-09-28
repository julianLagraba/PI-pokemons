import React from "react";
import { useEffect, useState } from "react";
import { Link,useHistory } from "react-router-dom";
import { postPokemon, getTypes } from "../actions";
import { useDispatch, useSelector} from "react-redux"
import styles from './Create.module.css'
import validate from "./validations";  
import { background } from "./imagenes/Imagenes";
 

export default function PokemonCreate(){
    const dispatch= useDispatch()
    const allPokemons = useSelector((state)=>state.pokemons)
    const types = useSelector((state=> state.types))
const history = useHistory()
const [errors, setErrors] = useState({})
    const [input, setInput] = useState({
        nombre: "",
    vida: "",
    ataque: "",
    defensa:"",
    velocidad:"",
    altura:"",
    peso:"",
    tipos: [],
    img: ""
    })

    function handleSubmit(e){
        e.preventDefault()
        let verif = allPokemons.find(e=> e.nombre === input.nombre)
        if(verif){
            alert("Ya existe un pokemon con ese nombre!!!") 
        }
        else{ 
        if (!errors.nombre) {
        
        
        dispatch(postPokemon(input))  
        alert("pokemon creado correctamente!!")
        setInput({
            nombre: "",
            vida: "",
            ataque: "",
            defensa:"",
            velocidad:"",
            altura:"",
            peso:"",
            tipos: [],
            img: ""
        })    
        history.push("/home")
    }
    else{alert("Alguno de los campos es incorrecto")}
   
    }
}

    function handleChange(e){
        setInput({
            ...input,
            [e.target.name] : e.target.value
        })
        setErrors(validate({
            ...input,
            [e.target.name] : e.target.value
        }))
        console.log(input)
    }
    
    function handleSelect(e){
     
        if(input.tipos.length < 2)
        {
            if(!input.tipos.includes(e.target.value))
            {
                setInput({
                                ...input,
                               tipos: [...input.tipos, e.target.value]
                            })
                            setErrors(validate({
                                ...input,
                                tipos: [...input.tipos, e.target.value]
                            }))
            }   
        }
        
    }
    function handleDelete(e){
       
        setInput({
            ...input,
            tipos: input.tipos.filter(a=>a!==e)
        })
        setErrors(validate({
            ...input,
            tipos: input.tipos.filter(a=>a!==e)
        }))
        
    }
    useEffect(()=> {
        dispatch(getTypes())
}, [])

console.log(input.tipos)
return(
    <div  className={styles.bg}>
        <img src={background} className={styles.image} alt="no encontre la imagen" ></img>
    <link href="https://fonts.googleapis.com/css2?family=Roboto+Mono&display=swap" rel="stylesheet"></link>
    <link href= "http://fonts.cdnfonts.com/css/pokemon-solid" rel="hoja de estilo"></link>
    <link href=" http://fonts.cdnfonts.com/css/pokemon-hollow " rel="hoja de estilo"></link>  
        
      
<form onSubmit={(e)=>handleSubmit(e)} className={styles.pokedex}>
<h1 className={styles.h1}>PokePedia</h1>
<div className={styles.glass}>
<h1>Crea tu propio Pokemon</h1>

<div className={styles.c1}>
    <div className={styles.a}>
    <h3>Nombre: </h3>
    <input className={styles.ord} type="text" value={input.nombre} name ="nombre" onChange={handleChange}/>
   
    </div>
    <div className={styles.a}>
    <h3>Vida:</h3>
    <input className={styles.ord} type="number" value={input.vida} onChange={handleChange} name ="vida" />
    </div>
    <div className={styles.a}>
    <h3>Ataque: </h3>
    <input className={styles.ord} type="number" value={input.ataque} onChange={handleChange} name ="ataque" />
    
    </div>
    <div className={styles.a}>
    <h3>Defensa:</h3>
    <input className={styles.ord} type="number" value={input.defensa} onChange={handleChange} name ="defensa" />
    
    </div>
</div>
<div className={styles.c2}>
    <div className={styles.a}>
    <h3>Velocidad:</h3>
    <input className={styles.ord} type="number" value={input.velocidad} onChange={handleChange} name ="velocidad" />
    
    </div>
    <div className={styles.a}>
    <h3>Altura:</h3>
    <input className={styles.ord} type="number" value={input.altura} onChange={handleChange} name ="altura" />
   
    </div>
    <div className= {styles.a}>
    <h3>Peso:</h3>
    <input className={styles.ord} type="number" value={input.peso} onChange={handleChange} name ="peso" />
    
    </div>
    <div className= {styles.a}>
    <h3>Imagen:</h3>
    <input className={styles.ord} placeholder="URL imagen" type="text" value={input.img} name ="img" onChange={handleChange}/>
    
    </div>
    </div>
   <div>
    <div className={styles.submit} >
    <div className={styles.types}> 
    
    <select onChange={handleSelect} className={styles.ord}>
   
        {types.map((e) => (            
            <option value = {e.id}>{e.nombre}</option>
        ) )}
       
    </select>
    </div>
    <h4 className={styles.h4type}>Selecciona el tipo de pokemon:</h4>
    <h5 className={styles.h5type}>Recuerda que solo puedes elegir 2 tipos</h5>
    <button type="submit"  className={styles.button}>Crear Pokemon</button>
    {Object.entries(errors).length !== 0 ?
<div className={styles.contenedor}>
<div className={styles.errores}>
    
<p className={errors.nombre ? styles.errors : styles.errors1}>{errors.nombre}</p>
<p className={errors.altura? styles.errors : styles.errors1}>{errors.altura}</p>
<p className={errors.defensa ? styles.errors : styles.errors1}>{errors.defensa}</p>
<p className={errors.ataque ? styles.errors : styles.errors1}>{errors.ataque}</p>
<p className={errors.img ? styles.errors : styles.errors1}>{errors.img}</p>
<p className={errors.velocidad ? styles.errors : styles.errors1}>{errors.velocidad}</p>
<p className={errors.altura ? styles.errors : styles.errors1}>{errors.altura}</p>
<p className={errors.peso ? styles.errors : styles.errors1}>{errors.peso}</p>
<p className={errors.tipos ? styles.errors : styles.errors1}>{errors.tipos}</p>
</div></div>:
<div className={styles.errors1}></div>
}
    <Link to= "/home"><button type="button" className={styles.button1}>Volver a inicio</button></Link>


</div>

</div>
</div>
</form>
<div className={styles.classtype}>
<ul><li>{input.tipos.map(tipoId=>{
            const type = types.find(type => type.id === parseInt(tipoId))
            return(
                <div className={styles.quitcard}>
                    <p>{type.nombre}</p>
                    <button className={styles.button2} onClick={()=>handleDelete(tipoId)}>x</button>
                </div>
            )
        })}            
        </li></ul>
</div>
        
    </div>
)

}