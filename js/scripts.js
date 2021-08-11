//creates pokemon repository
let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
<<<<<<< HEAD
<<<<<<< HEAD
  //let modalContainer = document.querySelector('#modal-container');
=======
>>>>>>> parent of 3d4081b (Added code for modals)
=======
  let modalContainer = document.querySelector('#modal-container');
>>>>>>> parent of aa75f9d (Added bootstrap)

  // Adds new pokemon to the pokemonList array with a conditional to make sure the correct type of data is entered
  function add(pokemon) {
    if (
      typeof pokemon === "object" &&
      "name" in pokemon &&
      "detailsUrl" in pokemon
    ) {
      pokemonList.push(pokemon);
    } else {
      console.log("pokemon is not correct");
    }
  }

  // Returns a pokemonList
  function getAll() {
    return pokemonList;
  }

<<<<<<< HEAD
  //shows details in modal
<<<<<<< HEAD
  function showDetails(item){
    loadDetails(item).then(function () {
      showModal(item);
=======
  //logs details to console
  function showDetails(pokemon){
    loadDetails(pokemon).then(function () {
      console.log(pokemon);
>>>>>>> parent of 3d4081b (Added code for modals)
=======
  function showDetails(pokemon){
    loadDetails(pokemon).then(function () {
      showModal(pokemon);
>>>>>>> parent of aa75f9d (Added bootstrap)
    });
  }

  //Function that adds a list of pokemon to the DOM, with buttons in an unordered list
  function addListItem(pokemon) {
    let pokemonList = document.querySelector('.pokemon-list');
    let listpokemon = document.createElement('li');
    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('button-class');
    listpokemon.appendChild(button);
    pokemonList.appendChild(listpokemon);
      button.addEventListener('click', function(){
        showDetails(pokemon);
      });
  }

  function loadList() {
    return fetch(apiUrl).then(function (response) {
      return response.json();
    }).then(function (json) {
      json.results.forEach(function (item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
      });
    }).catch(function (e) {
      console.error(e);
    })
  }

<<<<<<< HEAD
  //function to load details for each pokemon from the api
<<<<<<< HEAD
=======
>>>>>>> parent of 3d4081b (Added code for modals)
  function loadDetails (item) {
    let url = item.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
<<<<<<< HEAD
      item.imageUrlFront = details.sprites.front_default;
      item.imageUrlBack = details.sprites.back_default;
=======
      item.imageUrl = details.sprites.front_default;
>>>>>>> parent of 3d4081b (Added code for modals)
      item.height = details.height;
      item.types = details.types;
=======
  function loadDetails (pokemon) {
    let url = pokemon.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      pokemon.imageUrl = details.sprites.front_default;
      pokemon.height = details.height;
      pokemon.types = details.types;
>>>>>>> parent of aa75f9d (Added bootstrap)
    }).catch(function (e) {
      console.error(e);
    });
  }

<<<<<<< HEAD
  //function to create modal to display details
  function showModal(pokemon) {
    modalContainer.innerHTML = '';
    let modal = document.createElement('div');
    modal.classList.add('modal');

    let closeButtonElement = document.createElement('button');
    closeButtonElement.classList.add('modal-close');
    closeButtonElement.innerText = 'Close';
    closeButtonElement.addEventListener('click', hideModal);

    let titleElement = document.createElement('h1');
    titleElement.innerText = pokemon.name.toUpperCase();
    titleElement.classList.add('title');

    let heightElement = document.createElement('p');
    heightElement.innerText = 'Height: ' + pokemon.height;
    heightElement.classList.add('height');

    let imgElement = document.createElement('img');
    imgElement.src = pokemon.imageUrl;
    imgElement.classList.add('img');

    modal.appendChild(closeButtonElement);
    modal.appendChild(titleElement);
    modal.appendChild(heightElement);
    modal.appendChild(imgElement);
    modalContainer.appendChild(modal);

    modalContainer.classList.add('is-visible');
  }

  //function to hide the modal
  function hideModal() {
    modalContainer.classList.remove('is-visible');
  }

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
      hideModal();
    }
  });

  modalContainer.addEventListener('click', (e) => {
    if (e.target === modalContainer) {
      hideModal();
    }
  });

=======
>>>>>>> parent of 3d4081b (Added code for modals)
  return {
    add: add,
    getAll: getAll,
    loadList: loadList,
    loadDetails: loadDetails,
    addListItem: addListItem,
    showDetails: showDetails
  };
})();

//Creates list of pokemon on the HTML page
pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
