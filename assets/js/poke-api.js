
const pokeApi = {}

function convertPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon()
    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types

    const abilities = pokeDetail.abilities.map((ability) => ability.ability.name);
    pokemon.abilities = abilities;

    pokemon.types = types
    pokemon.type = type

    pokemon.photo = getPokemonPhoto(pokemon.number);

    pokemon.height = pokeDetail.height;

    pokemon.weight = pokeDetail.weight;

    pokemon.speciesUrl = pokeDetail.species.url;
  
    const hpStat = pokeDetail.stats.find((stat) => stat.stat.name === "hp");
    pokemon.hp = hpStat.base_stat;
  
    const attackStat = pokeDetail.stats.find(
      (stat) => stat.stat.name === "attack"
    );
    pokemon.attack = attackStat.base_stat;
  
    const defenseStat = pokeDetail.stats.find(
      (stat) => stat.stat.name === "defense"
    );
    pokemon.defense = defenseStat.base_stat;
  
    const specialAttackStat = pokeDetail.stats.find(
      (stat) => stat.stat.name === "special-attack"
    );
    pokemon.specialAttack = specialAttackStat.base_stat;
  
    const specialDefenseStat = pokeDetail.stats.find(
      (stat) => stat.stat.name === "special-defense"
    );
    pokemon.specialDefense = specialDefenseStat.base_stat;
  
    const speedStat = pokeDetail.stats.find((stat) => stat.stat.name === "speed");
    pokemon.speed = speedStat.base_stat;
  
    const moves = pokeDetail.moves.map((move) => move.move.name);
    pokemon.moves = moves;

    return pokemon
}

function convertPokeApiSpeciesToPokeSpecies(pokeS){ //o json passado vem do link https://pokeapi.co/api/v2//pokemon-species/"ID do pokemon"/
  const pokeSpec = new PokeSpecies();
  pokeSpec.number = parseInt(pokeS.id);
  pokeSpec.name = pokeS.name;
  pokeSpec.evoChainUrl = pokeS.evolution_chain.url; // passa a URL https://pokeapi.co/api/v2/evolution-chain/"ID de evolução diferente do ID do pokemon"/
  return pokeSpec;
}

function getAllFieldsAndValues(json) {
  const fields = [];

  function traverse(obj) {
    if (typeof obj === "object" && obj !== null) {
      if (Array.isArray(obj)) {
        for (const item of obj) {
          traverse(item);
        }
      } else {
        for (const key in obj) {
          fields.push({ field: key, value: obj[key] });
          traverse(obj[key]);
        }
      }
    }
  }

  traverse(json);

  return fields;
}

function getEvoArray(evoArray){
  const array1 = evoArray[3].valeu[0];
  let array2 = [];
  if (array1.evolves_to.length() !== 0 ){
    array2 = array1.evolves_to[0];
  }
 
}

function getUrlId(url){
  // Remover a barra final, se existir
  if (url.endsWith("/")) {
    url = url.slice(0, -1);
  }
  // Dividir a URL em partes
  var partes = url.split('/');
  // Obter o último elemento
  var ultimoElemento = partes[partes.length - 1];
  var ultimoNumero = parseInt(ultimoElemento);
  return ultimoNumero;
}

function convertPokeApiChainToPokeChain(pokeC){ //recebe um json com toda a informação da cadeia de evolução do Pokemon vem do link https://pokeapi.co/api/v2/evolution-chain/"ID de cadeia de evolução"/
  const pokeChain = new PokeChainEvo();
  const allFields = getAllFieldsAndValues(pokeC); // transforma todos os campos do json em array pq tem campos com nome de numeros e o JS ñ aceita, mas aceita pegar o conteudo pelo passo anterior do array. 
  pokeChain.evoNumber = parseInt(pokeC.id); // ID de cadeia de evolução do Pokemon diferente do ID do Pokemon
  pokeChain.number = getUrlId(pokeC.chain.species.url); // Esse ID é o do Pokemons
  pokeChain.name = pokeC.chain.species.name; // o nome do primeiro link de evolução EX: se o Pokemon for o Charizard o nome q vai aqui é o Charmander
  const tempIfArray = allFields[3].value;
  let tempArray2 = [];
  pokeChain.evoChain[0] = {name: pokeChain.name, id: pokeChain.number};
  if (tempIfArray.length != 0){
    pokeChain.evoChain[1] = {name: tempIfArray[0].species.name, id: getUrlId(tempIfArray[0].species.url)}
    if (tempIfArray.length >= 1){
      let j = 2;
      for (let i = 1; i < tempIfArray.length; i++) {
        pokeChain.evoChain[j] = {name: tempIfArray[i].species.name, id: getUrlId(tempIfArray[i].species.url)}
        j++;
      }
    }
    if (tempIfArray[0].evolves_to.length != 0){
      tempArray2 = tempIfArray[0].evolves_to[0];
      pokeChain.evoChain[2] = {name: tempArray2.species.name, id: getUrlId(tempArray2.species.url)}
    }
  }else{
    return;
  }

  return pokeChain;
}

pokeApi.getPokemonEvolution = (id) => {
  return fetch('https://pokeapi.co/api/v2/pokemon-species/'+id+'/')
  .then((response) => response.json())
  .then(convertPokeApiSpeciesToPokeSpecies);
};

pokeApi.getPokemonChainEvolution = (ChainUrl) => {
    return fetch(ChainUrl)
    .then((response) => response.json())
    .then(convertPokeApiChainToPokeChain);
};

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convertPokeApiDetailToPokemon)
}

pokeApi.getPokemons = (offset = 0, limit = 10) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`

    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
        .then((detailRequests) => Promise.all(detailRequests))
        .then((pokemonsDetails) => pokemonsDetails)
        
}
