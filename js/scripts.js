let pokemonRepository = (function () {
  let pokemonList = [
    {
      name: 'Bulbasaur',
      number: 001,
      height: 2.4,
      type: ['grass', 'poison'],
      weakness: ['fire', 'psychic', 'flying', 'ice'],
      evolutions: ['Ivysaur', 'Venusaur'],
    },
    {
      name: 'Charmander',
      number: 004,
      height: 2,
      type: 'fire',
      weakness: ['water', 'ground', 'rock'],
      evolutions: ['Charmeleon', 'Charizard'],
    },
    {
      name: 'Squirtle',
      number: 007,
      height: 1.08,
      type: 'water',
      weakness: ['grass', 'electric'],
      evolutions: ['Wartortle', 'Blastoise'],
    },
    {
      name: 'Pikachu',
      number: 025,
      height: 1.04,
      type: 'electric',
      weakness: 'ground',
      evolutions: ['Pichu', 'Raichu'],
    }
  ];

  function add(pokemon) {
    if (
      typeof pokemon === "object" &&
      "name" in pokemon &&
      "number" in pokemon &&
      "height" in pokemon &&
      "type" in pokemon &&
      "weakness" in pokemon &&
      "evolutions" in pokemon
    ) {
      pokemonList.push(pokemon);
    } else {
      console.log("pokemon is not correct");
    }
  }

  function getAll() {
    return pokemonList;
  }

  function addListItem(pokemon) {
    let pokemonList = document.querySelector(".pokemon-list");
    let listpokemon = document.createElement("li");
    let button = document.createElement("button");
    button.innerText = pokemon.name;
    button.classList.add("button-class");
    listpokemon.appendChild(button);
    pokemonList.appendChild(listpokemon);
  }

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem
  };
})();

pokemonRepository.add(
  {
    name: 'Meowth',
    number: 052,
    height: 1.04,
    type: 'normal',
    weakness: 'fighting',
    evolutions: ['Persian'],
  }
)

console.log(pokemonRepository.getAll());

//Creates list of pokemon including type and size.
/*pokemonRepository.getAll().forEach(function(pokemon) {
    document.write("<p>" + pokemon.name + " is a " + pokemon.type + " type. Height: " + pokemon.height + "."); {
      if (pokemon.height > 2) {
        document.write(" Wow! That\'s big! </p>");
      } else if (pokemon.height < 1.05) {
        document.write(" Whoa! That\'s tiny! </p>");
      }
    }
})*/

pokemonRepository.getAll().forEach(function (pokemon) {
  pokemonRepository.addListItem(pokemon);
});
