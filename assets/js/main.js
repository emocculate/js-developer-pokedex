const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')
const pokemonDetailsContainer = document.getElementById('pokemonDetail')
const maxRecords = 151
const limit = 10
let offset = 0;

function convertPokemonToLi(pokemon) {
    getPokemon()
    return `
        <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>
        </li>
    `
}

function getPokemon(){
    setTimeout(()=>{
        const pokemonsDetails = document.querySelectorAll('.pokemon')   
        for(let item in pokemonsDetails){
            pokemonsDetails[item].addEventListener('click',setPokemon)  
        }   
    },1000)
}

function setPokemon(el){
    //Seleciona o elemento que foi clicado
    let i = el.srcElement.outerText
    
    //Caso o elemento clicado tenha sido o número então manda pra procurar nos pokemons recuperados
    if(i.includes('#')){
        //Remove o # da frente do númerro
        let pokemonSelectedId = i.slice(1,i.length);
        //Procura nos pokemons recuperados o número que selecionamos
        let pokemonSelected = pokemons.find(i => i.id == pokemonSelectedId);
        console.log(pokemonSelected);
    }}

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    })
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})

function setPokemon(el){
    //Seleciona o elemento que foi clicado
    let i = el.srcElement.outerText
    
    //Caso o elemento clicado tenha sido o número então manda pra procurar nos pokemons recuperados
    if(i.includes('#')){
        //Remove o # da frente do númerro
        let pokemonSelectedId = i.slice(1,i.length);
        //Procura nos pokemons recuperados o número que selecionamos
        let pokemonSelected = pokemons.find(i => i.id == pokemonSelectedId);
        console.log(pokemonSelected);
        //Pokemon 
        showPokemonsDetails(pokemonSelected);

        //- Converter modelo de dados do pokemon em uma página 
        

    }}

function showPokemonsDetails(pokemon){
    console.log(pokemon);
    const pokemonDetailsHTML = 
    `<section class="pokemonDetailWrapper">
        <button class="backButton">
         <-
        </button>
        <header class="pokemonDetail-header ${pokemon.types[0].type.name}">
            <h1 class="pokeName">${pokemon.name}</h1>
                <ul class="types">
                    ${pokemon.types.map((i) => `<li class="type ${i.type.name}">${i.type.name}</li>`).join('')}    
                </ul>
            <img src="${pokemon.sprites.other.dream_world.front_default}" alt="${pokemon.name}">
        </header>

        <ul class="hability">
                ${pokemon.moves.map((i) => `<li class="hab">
                        <span class="ability">
                            <strong>
                                    Movimento: 
                            </strong> 
                            <span>
                                ${i.move.name}
                            </span>
                        </span>
                    </li>`).join('')
                }    
        </ul>
    </section>
    `
    console.log(pokemonDetailsHTML);

    pokemonList.style.display = 'none';
    loadMoreButton.style.display = 'none';

     // Preencher e exibir os detalhes do Pokémon
    
     console.log(pokemonDetailsContainer);
     pokemonDetailsContainer.innerHTML += pokemonDetailsHTML;
     console.log(pokemonDetailsContainer);
}