export default function validate (input)
    {
        let validateName = /^[a-z]+$/i;
        let validateUrl = /^(ftp|http|https):\/\/[^ "]+$/;
        let errors={}
        if(!input.nombre)
        {
            errors.nombre ="Se requiere un nombre"
        }
        else if( input.nombre.length < 3){
            errors.nombre ="El nombre debe tener como minimo 3 letras"
        }
        else if(!validateName.test(input.nombre)){
            errors.nombre ="El nombre solo puede contener letras"
        }
        else if (!input.vida ) {
            errors.vida = "Debes completar el campo ¨vida¨";
        }
        else if(parseInt(input.vida) < 1){
            errors.vida = "La vida debe ser mayor a 1";
        }
        else if (!input.ataque ) {
            errors.ataque = "Debes completar el campo ¨ataque¨";
        }
        else if(parseInt(input.ataque) < 1){
            errors.ataque= "El ataque debe ser mayor a 1";
        }
        else if (!input.defensa ) {
            errors.defensa = "Debes completar el campo ¨defensa¨";
        }
        else if(parseInt(input.defensa) < 1){
            errors.defensa = "la defensa debe ser mayor a 1";
        }
        else if (!input.velocidad) {
            errors.velocidad = "Debes completar el campo ¨velocidad¨";
        }
        else if(parseInt(input.velocidad) < 1){
            errors.velocidad = "La velocidad debe ser mayor a 1";
        }
        else if (!input.altura ) {
            errors.altura = "Debes completar el campo ¨altura¨";
        }
        else if(parseInt(input.altura) < 1){
            errors.altura = "La altura debe ser mayor a 1";
        }
        else if (!input.peso ) {
            errors.peso = "Debes completar el campo ¨peso¨";
        }
        else if(parseInt(input.peso) < 1){
            errors.peso = "El peso debe ser mayor a 1";
        }
        else if(!input.img){
            errors.img = "Se requiere una URL"
        }
       
        else if(!validateUrl.test(input.img)){
            errors.img = "Debe ser una URL valida ";
        }
        else if(input.tipos.length===0){
        
            errors.tipos= "Debe seleccionar un tipo"
        }
        
        return errors
    }