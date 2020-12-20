const pokedex = document.getElementById('pokedex');

const fetchPokemon = () => {
    const totalPokemon = 402;
    const promises = [];

    for (let i = 1; i <= totalPokemon; i++) {
        const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        promises.push(fetch(url).then((res) => res.json()));
    }

    Promise.all(promises).then((results) => {
        const pokemon = results.map((data) => ({
            name: data.name,
            id: data.id,
            image: data.sprites['front_default'],
            type: data.types.map((type) => type.type.name).join(' | ')
        }));
        displayPokemon(pokemon);
    });
}

const displayPokemon = (pokemon) => {
    console.log(pokemon);
    const pokemonHtmlString = pokemon.map(pokeman => 
        `<div class="col-lg-4 col-md-4 col-6 pokemon-data"><img src="${pokeman.image}"><h3 class="name">${pokeman.name}</h3><p class="type">${pokeman.type}</p></div>`
    ).join('');
    pokedex.innerHTML = pokemonHtmlString;
}

fetchPokemon();