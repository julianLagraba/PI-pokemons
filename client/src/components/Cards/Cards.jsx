import PokeCard from "../Card/Card";
import styles from "./Cards.module.css"
<link href="https://fonts.googleapis.com/css2?family=Roboto+Mono&display=swap" rel="stylesheet"></link>

const Cards = ({ allPokemons })=>(
    <form className={styles.pokedex}>
    <div className={styles.Cards}>
        {
        allPokemons?.map((el) => <PokeCard nombre={ el.nombre} attack={el.ataque} types={el.tipo} id={el.id}  img={el.img} />)
        }
    </div>
    </form>
)
export default Cards;