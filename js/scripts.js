//creates pokemon repository
let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
  let searchInput = document.querySelector('#searchBar');

  // displays a loading message until the content has loaded
  function showLoadingMessage() {
    document.querySelector('.loading-message').classList.add('visible');
  }

  //hides the loading messafe one content is loaded
  function hideLoadingMessage() {
    document.querySelector('.loading-message').classList.add('hidden');
  }

  // Adds new pokemon to the pokemonList array with a conditional to make sure the correct type of data is entered
  function add(pokemon) {
    if (
      typeof pokemon === 'object' &&
      'name' in pokemon &&
      'detailsUrl' in pokemon
    ) {
      pokemonList.push(pokemon);
    } else {
      console.log('pokemon is not correct');
    }
  }

  // Returns an array of all the pokemon in the pokemonList
  function getAll() {
    return pokemonList;
  }

  //Function that adds a list of pokemon to the DOM, with buttons in an unordered list
  function addListItem(pokemon) {
    let pokemonList = document.querySelector('.pokemon-list');
    let listpokemon = document.createElement('li');
    listpokemon.classList.add('group-list-item');

    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('button-class', 'btn', 'btn-primary', 'text-capitalize');
    button.setAttribute('data-target', '#pokemonModal');
    button.setAttribute('data-toggle', 'modal');

    listpokemon.appendChild(button);
    pokemonList.appendChild(listpokemon);
      button.addEventListener('click', function(){
        showDetails(pokemon);
      })
  }

  //function that retreives items from the pokemon api
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
    });
  }

  //function to load details for each pokemon from the api
  function loadDetails (item) {
    let url = item.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      item.imageUrlFront = details.sprites.front_default;
      item.imageUrlBack = details.sprites.back_default;
      item.height = details.height;
      item.types = [];
      for (let i = 0; i < details.types.length; i++) {
        item.types.push(details.types[i].type.name);
      }
    }).catch(function (e) {
      console.error(e);
    });
  }

  //clicking on the pokemon's button will open the modal and show all details
  function showDetails(item){
    loadDetails(item).then(function () {
      showModal(item);
    });
  }

  //function to open the modal to display details
  function showModal(item) {
    let modalBody = $('.modal-body');
    let modalTitle = $('.modal-title');
    let modalHeader = $('.modal-header');
    //clear existing content of modal
    modalTitle.empty();
    modalBody.empty();

    //create element for name in modal content
    let nameElement = $('<h1>' + item.name + '</h1>');
    //create image in modal content
    let imageElementFront = $('<img class="modal-img" style="width:50%">');
    imageElementFront.attr('src', item.imageUrlFront);
    let imageElementBack = $('<img class="modal-img" style="width:50%">');
    imageElementBack.attr('src', item.imageUrlBack);
    //create height element for modal content
    let heightElement = $('<p>' + 'Height: ' + item.height + '</p>');
    //create types element for modal content
    let typesElement = $('<p>' + 'Types: ' + item.types + '</p>');

    //displays the seperate details inside the modal
    modalTitle.append(nameElement);
    modalBody.append(imageElementFront);
    modalBody.append(imageElementBack);
    modalBody.append(heightElement);
    modalBody.append(typesElement);
  }

  //adds search background
  searchInput.addEventListener('input', function() {
    let listItem = document.querySelectorAll('li');
    let value = searchInput.value.toUpperCase();

    listItem.forEach(function(pokemon) {
      if (pokemon.innerText.toUpperCase().indexOf(value) > -1) {
        pokemon.style.display = '';
      } else {
        pokemon.style.display = 'none';
      }
    });
  });


  return {
    add: add,
    getAll: getAll,
    loadList: loadList,
    loadDetails: loadDetails,
    addListItem: addListItem,
    showDetails: showDetails,
    showModal: showModal
  };
})();

//Loads list of pokemon from the Url and adds them to the pokemonList array
pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
