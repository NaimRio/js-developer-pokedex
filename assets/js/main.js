const content = document.querySelector("#content");
const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')
const pokemonCard = document.querySelector("#pokemonCard");
const currentPokemon = document.querySelector("#currentPokemon div");

const maxRecords = 151
const limit = 50;
let offset = 0;


function handlePokemon(pokemon) {
    content.classList.add("hidden");
    pokemonCard.classList.remove("hidden");
    updatePokemon(pokemon);
}

function convertPokemonToLi(pokemon) {
    const pokeLi = `
        <li class="pokemon ${pokemon.type}" id="p${pokemon.number}">
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
    const li = document.createElement("li");
    li.innerHTML = pokeLi;
    li.addEventListener("click", () => handlePokemon(pokemon));

    return li;
}

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtmlElement = pokemons.map(convertPokemonToLi)
        newHtmlElement.map((pokemon) => pokemonList.appendChild(pokemon));
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