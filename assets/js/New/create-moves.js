function createMoves(pokemon) {
  const moves = document.querySelector("#moves");
  moves.innerHTML = "";
  moves.classList.add("moves");
  moves.classList.add("hidden");
  
  for (let i = 0; i < pokemon.moves.length; i++) {
    const li = document.createElement("li");
    const span = document.createElement("span");
    const text = document.createTextNode(pokemon.moves[i]);
    
    span.appendChild(text);
    li.appendChild(span);
    
    moves.appendChild(li);
  }
  topo();
}
