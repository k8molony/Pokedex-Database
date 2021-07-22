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

//Creates list of pokemon and their sizes.
for (let i=0; i < pokemonList.length; i++) {
    document.write("<p>" + pokemonList[i].name + " is " + pokemonList[i].height + " tall."); {
      if (pokemonList[i].height > 2) {
        document.write(" Wow! That\'s big! </p>");
      } else if (pokemonList[i].height < 2) {
        document.write(" Whoa! That\'s tiny! </p>");
      }
    }
}

//Creates list of Pokemon and their types
pokemonList.forEach(function(pokemon) {
  document.write('<p>' + pokemon.name + ' is ' + pokemon.type + ' type.' + '</p>');
})
