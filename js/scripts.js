//creates pokemon repository
let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
  //let modalContainer = document.querySelector('#modal-container');

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

  //Function that adds a list of pokemon to the DOM, with buttons in an unordered list
  function addListItem(pokemon) {
    let pokemonList = document.querySelector('.pokemon-list');
    let listpokemon = document.createElement('li');
    listpokemon.classList.add('group-list-item');

    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('button-class', 'btn', 'btn-primary');
    button.setAttribute("data-target", "#pokemonModal");
    button.setAttribute("data-toggle", "modal");

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

  //shows details in modal
  function showDetails(item){
    loadDetails(item).then(function () {
      showModal(item);
    });
  }

  //function to create modal to display details
  function showModal(item) {
    let modalBody = $(".modal-body");
    let modalTitle = $(".modal-title");
    let modalHeader = $(".modal-header");
    //clear existing content of modal
    modalTitle.empty();
    modalBody.empty();

    //create element for name in modal content
    let nameElement = $("<h1>" + item.name + "</h1>");
    //create image in modal content
    let imageElementFront = $('<img class="modal-img" style="width:50%">');
    imageElementFront.attr("src", item.imageUrlFront);
    let imageElementBack = $('<img class="modal-img" style="width:50%">');
    imageElementBack.attr("src", item.imageUrlBack);
    //create height element for modal content
    let heightElement = $("<p>" + "Height: " + item.height + "</p>");
    //create types element for modal content
    let typesElement = $("<p>" + "Types: " + item.types + "</p>");

    modalTitle.append(nameElement);
    modalBody.append(imageElementFront);
    modalBody.append(imageElementBack);
    modalBody.append(heightElement);
    modalBody.append(typesElement);
  }

  //function to create modal to display details
  /*function showModal(pokemon) {
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
  });*/

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
