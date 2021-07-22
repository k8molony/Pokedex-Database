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
    pokemonList.push(pokemon);
  }

  function getAll() {
    return pokemonList;
  }

  return {
    add: add,
    getAll: getAll
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
pokemonRepository.getAll().forEach(function(pokemon) {
    document.write("<p>" + pokemon.name + " is a " + pokemon.type + " type. Height: " + pokemon.height + "."); {
      if (pokemon.height > 2) {
        document.write(" Wow! That\'s big! </p>");
      } else if (pokemon.height < 1.05) {
        document.write(" Whoa! That\'s tiny! </p>");
      }
    }
})
