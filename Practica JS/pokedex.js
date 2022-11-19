
const cancion = new Audio('./pokeballSound.mp3');
/* con esta función se captura el json del pokemon pedido*/
const fetchPokemon = () => {
    const pokeNameInput = document.getElementById("pokeName");
    let pokeName = pokeNameInput.value;
    pokeName = pokeName.toLowerCase();
    const url = `https://pokeapi.co/api/v2/pokemon/${pokeName}`;

    fetch(url).then((res) => {
        if (res.status != "200") {
            /* en esta parte nos encargamos de la funcionalidad si no encuentra pokemon*/
            const pokePhoto = document.getElementById("pokeImg");
            pokePhoto.src = "./MissingNo.png";
            pokePhoto.style.width="5%";
            pokePhoto.style.height= '20%';
            pokePhoto.style.top='35%';
            let pokeTy = document.getElementById("tipoEncontrado"); 
            putTableName();
            let pokeName = document.getElementById("nameEncontrado");
            pokeName.innerHTML = "Pokemon no encontrado";
            pokeTy.innerHTML = "Error";
            poke = document.getElementById("textStats"); 
            poke.innerHTML = "??????????";
            poke = document.getElementById("textAbi"); 
            poke.innerHTML = "??????????";
            putText();
        }
        else {
            return res.json();
            }
        }
        ).then((data) => {
        if (data) {
            let pokeImg = data.sprites.front_default;
            let pokeNam = data.name;
            let pokeType = data.types;
            let pokeStats = data.stats;
            let pokeAbilities = data.abilities;
            statsAbi(pokeAbilities);
            statsText(pokeStats);
            nOfTypes(pokeType);
            pokeImage(pokeImg);
            pokePutName(pokeNam);
        }
    });
}

/* con esta función se vuelve visible la tabla donde está el nombre y los tipos*/
function putTableName(){
    const divFondoNombre = document.getElementById("divNomTipFondo");
    const divNombre = document.getElementById("divNomTip");
    divFondoNombre.style.opacity='100%';
    divNombre.style.opacity='100%';
}
/* con esta función se vuelve invisible la tabla donde está el nombre y los tipos*/
function hideTableName(){
    const divFondoNombre = document.getElementById("divNomTipFondo");
    const divNombre = document.getElementById("divNomTip");
    divFondoNombre.style.opacity='0%';
    divNombre.style.opacity='0%';
}
/* con esta función se vuelve visible el texto de mov y stats*/
function putText(){
    const mov = document.getElementById('invText');
    mov.style.opacity='100%';
    const stat = document.getElementById('invText2');
    stat.style.opacity='100%';
}

/* función que se encarga de conseguir que tipo de pokemon es y enviarlos al html */
function nOfTypes (Type){
    let repes = 0;
    let regreso = "";
    for(i = 0 ; i < Type.length; i++){
        if(repes == (Type.length - 1)){
            regreso += Type[repes].type.name;
        }else{
            regreso += Type[repes].type.name+", ";
            repes = repes + 1;
        }
    } 
    let pokeTy = document.getElementById("tipoEncontrado"); 
    pokeTy.innerHTML = regreso;
}


/* esta función cambia el signo a la del pokemon*/
const pokeImage = (url) => {
    const pokePhoto = document.getElementById("pokeImg");
    pokePhoto.src = url;
    pokePhoto.style.width="20%";
    pokePhoto.style.height= '30%';
    pokePhoto.style.top="28%";
}
/* esta función pone el nombre del pokemon buscado*/
const pokePutName = (url) => {
    putTableName();
    let pokeName = document.getElementById("nameEncontrado");
    pokeName.innerHTML = url;
}
/* Se encarga de buscar las estadisticas y ponerlas en el html*/
function statsText(stats){
    let repes = 0;
    let regreso = "";
    for(i = 0 ; i < stats.length; i++){
        if(repes == (stats.length - 1)){
            regreso += stats[repes].stat.name+': '+stats[repes].base_stat+".";
        }else{
            regreso += stats[repes].stat.name+': '+stats[repes].base_stat+", ";
            repes = repes + 1;
        }
    } 
    let pokeTy = document.getElementById("textStats"); 
    pokeTy.innerHTML = regreso;
}
/* Se encarga de buscar los movimientos y ponerlas en el html*/
function statsAbi(mov){
    let repes = 0;
    let regreso = "";
    for(i = 0 ; i < mov.length; i++){
        if(repes == (mov.length - 1)){
            regreso += mov[repes].ability.name+".";
        }else{
            regreso += mov[repes].ability.name+", ";
            repes = repes + 1;
        }
    } 
    putText();
    let pokeTy = document.getElementById("textAbi"); 
    pokeTy.innerHTML = regreso;
}
/* Se encarga de hacer la animación del trainer y el sonido*/
function pokeTrain(){
    let pokeTy = document.getElementById("pokeTrain"); 
    pokeTy.src = "./pokeGif.gif";
    pokeTy.style.width='100%';
    pokeTy.style.height='80%';
    pokeTy.style.top='-19%';
    pokeTy.style.left='0px';
    pokeTy.style.zIndex = '2';
    setTimeout(() => cancion.play(), 800);
    setTimeout(() => pokeTrainOff(), 1200)
}
/*Quita la animación*/
function pokeTrainOff(){
    let pokeTy = document.getElementById("pokeTrain"); 
    pokeTy.src = "";
    pokeTy.style.width='0%';
    pokeTy.style.height='0%';
}
function muteOrUnmute(){
    let mute = document.getElementById("imgSpeaker");
    if(cancion.muted == true){
        mute.src ='speakerOn.png';
        cancion.muted = false;
    }else{
        cancion.muted = true;
        mute.src ='speakerOff.png';
    }
}

