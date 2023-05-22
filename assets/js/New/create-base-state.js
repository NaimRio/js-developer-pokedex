function createBaseState(pokemon) {
  const baseState = document.querySelector("#baseState");
  baseState.innerHTML = "";
  baseState.classList.add("hidden");
  baseState.appendChild(createElementAttribute("HP", pokemon.hp));
  baseState.appendChild(createElementAttribute("Attack", pokemon.attack));
  baseState.appendChild(createElementAttribute("Defense", pokemon.defense));
  baseState.appendChild(createElementAttribute("Sp. Atk", pokemon.specialAttack));
  baseState.appendChild(createElementAttribute("Sp. Def", pokemon.specialDefense));
  baseState.appendChild(createElementAttribute("Speed", pokemon.speed));
  topo();
}

function createElementAttribute(text, value) {
  const li = document.createElement("li");
  const span = document.createElement("span");
  const div = document.createElement("div");
  const strong = document.createElement("strong");
  const color = value > 50 ? "green" : "red";

  span.textContent = text;
  strong.textContent = value;
  div.classList.add("experienceBar");
  div.style.height = "2px";
  div.innerHTML = `<div style="--i: ${
    (value * 100) / 210
  }%;--color:${color}"></div>`;
  li.appendChild(strong);
  li.appendChild(span);
  li.appendChild(div);

  return li;
}
