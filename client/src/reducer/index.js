
const intialState = {
    pokemons : [],
    allPokemons : [],
    types:[],
    detail:[]
}

function rootReducer (state = intialState, action){
    switch(action.type){
        case 'GET_POKEMONS':
            return{
                ...state,
                pokemons: action.payload,
                allPokemons: action.payload
            }    

            case "SEARCH":
                let validSearch = action.payload
                
                    if(Array.isArray(validSearch))
                {
                    return{
                        ...state,
                        pokemons: action.payload
                    }
                }
                else{
                    alert("No existe un pokemon con ese nombre")
                    return{
                        ...state,
                        pokemons: state.pokemons
                    }
            }
            case 'FILTER_BY_TYPE':
                const allPokemons = state.allPokemons
                const typeFilter = action.payload === 'todos' ? allPokemons : allPokemons.filter(e => e.tipos.some(e => e.nombre === action.payload));
                return{
                    ...state,
                    pokemons: typeFilter 
                }
            case 'FILTER_CREATED':
                const createdFilter = action.payload === 'created'? state.allPokemons.filter(el => el.createdInDb) : state.allPokemons.filter(el => !el.createdInDb)
                return{
                    ...state,
                    pokemons: action.payload === 'todos'? state.allPokemons : createdFilter
                }
                case "ORDER_NAME":
            
                    let arrOrd
                    if(action.payload === "asc" ){
                    arrOrd = state.pokemons.sort((a,b)=>{
                        
                        if(a.nombre.toLowerCase() > b.nombre.toLowerCase()){
                            return 1;
                        }
                        if(a.nombre.toLowerCase() < b.nombre.toLowerCase()){
                            return -1;
                        } 
                        return 0;
                    }) }
                    else if(action.payload === "desc"){
                    arrOrd =  state.pokemons.sort((a,b)=>{
                        if(a.nombre.toLowerCase() < b.nombre.toLowerCase()){
                            return 1;
                        }
                        if(a.nombre.toLowerCase() > b.nombre.toLowerCase()){
                            return -1;
                        } 
                        return 0;
                    })}
                    else if(action.payload === "may"){
                        arrOrd =  state.pokemons.sort((a,b)=>{
                            if(a.ataque < b.ataque){
                                return 1;
                            }
                            if(a.ataque > b.ataque){
                                return -1;
                            } 
                            return 0;
                        })}
            
                    else if(action.payload === "men"){
                        arrOrd =  state.pokemons.sort((a,b)=>{
                            if(a.ataque > b.ataque){
                                return 1;
                            }
                            if(a.ataque < b.ataque){
                                return -1;
                            } 
                            return 0;
                        })}
                    
                    return{
                        ...state,
                        pokemons: arrOrd
                    }

                    case "POST_POKEMON":
                            return{
                                ...state
                            }
                    case "DETAIL":
                        return{
                            ...state,
                            detail: action.payload
                        }

      case "GET_TYPES":
      return{
        ...state,
        types: action.payload
      }
      case "GET_DETAILS":
        return{
            ...state,
            detail: action.payload
        }

            default:
                return state;
    }
    


}
export default rootReducer;