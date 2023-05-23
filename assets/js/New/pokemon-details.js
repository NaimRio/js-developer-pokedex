const infoPokemon = document.querySelector("#infoPokemon");
const arrowLeft = document.querySelector("#arrow-left");
const navegation = document.querySelectorAll("nav h2");
const evolution = document.querySelector("#evolution");

arrowLeft.addEventListener("click", resetPokemonCard);

navegation.forEach((element, index) => {
  element.addEventListener("click", () => isActive(index));
});

async function updatePokemon(pokemon) {
  classesPokemonCard(pokemon.type);
  currentPokemon.innerHTML = `
          <span class="name">${pokemon.name}</span>
          <span class="number">#${pokemon.number}</span>

          <div class="detail">
            <ol class="types">
              ${pokemon.types.map((type) => `<span class="type ${type}">${type}</span>`).join('')}
            </ol>

            <img
              src="${pokemon.photo}"
              alt="${pokemon.name}"
          </div>
`;

  createAbout(pokemon);
  createBaseState(pokemon);
  await createMoves(pokemon);
  await createEvolution(pokemon);
}

function classesPokemonCard(className) {
  currentPokemon.parentElement.classList.forEach((classNameActive) => {
    currentPokemon.parentElement.classList.remove(classNameActive);
  });
  currentPokemon.parentElement.classList.add("pokemon");
  currentPokemon.parentElement.classList.add(`${className}`);
}

function resetPokemonCard() {
  // const about = document.querySelector("#about");
  resetActive();
  content.classList.remove("hidden");
  pokemonCard.classList.add("hidden");
  navegation[0].classList.add("active");
  // about.classList.remove("hidden");
}

function isActive(index) {
  const ols = infoPokemon.querySelectorAll("ol");

  resetActive();
  navegation[index].classList.add("active");

  index === 0 && ols[index].classList.remove("hidden");
  index === 1 && ols[index].classList.remove("hidden");
  index === 2 && ols[index].classList.remove("hidden");
  index === 3 && ols[index].classList.remove("hidden");
}

function resetActive() {
  const ols = infoPokemon.querySelectorAll("ol");

  for (let i = 0; i < navegation.length; i++) {
    navegation[i].classList =
      "active" && navegation[i].classList.remove("active");
    ols[i].classList.add("hidden");
  }
}

evolution.addEventListener('click', async (event) => {
  const clickedElement = event.target;
  const closestImage = clickedElement.closest('img');
  const idImg = getUrlId(closestImage.src);
  const urlPoke = {name:closestImage.alt ,url:'https://pokeapi.co/api/v2/pokemon/'+idImg+'/'};
  const pokemon = await pokeApi.getPokemonDetail(urlPoke);
  navegation[2].classList.remove("active");
  navegation[0].classList.add("active");
  updatePokemon(pokemon);

})
