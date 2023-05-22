async function createEvolution(pokemon) {
  const evolution = document.querySelector("#evolution");
  evolution.innerHTML = "";
  evolution.classList.add("hidden", "evolution");

  const id = Math.ceil(pokemon.number);
  const pokeEsp = await pokeApi.getPokemonEvolution(id);
  const pokeEspUrl = pokeEsp.evoChainUrl;
  const pokemonChain = await pokeApi.getPokemonChainEvolution(pokeEspUrl);
  
  if (pokemonChain) {
    for (const evo of pokemonChain.evoChain) {
      evolution.innerHTML += createEvolutionListItem(evo);
    }
  } else {
    evolution.innerHTML += createEvolutionListItem(pokeEsp);
  }
  topo();
}

function createEvolutionListItem(pokemon) {
  return `<li>
    <div class="evolution">
      <div class="img-group">
        <div class="img">
          <img src="${getPokemonPhoto(pokemon.id)}" alt="${pokemon.name}">
        </div>
        <p>${pokemon.name}</p>
      </div>
    </div>
  </li>`;
}







