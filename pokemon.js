async function getPokemon() {
    // get all pokemon
    let pokemonList = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0')
    // get 3 random pokemon
    ids = [];
    for (let i = 1; i <= 3; i++) {
        let randomId = Math.floor(Math.random() * pokemonList.data.results.length);
        ids.push(randomId);
    }
    let pokemon = await Promise.all([
        axios.get(pokemonList.data.results[ids[0]].url),
        axios.get(pokemonList.data.results[ids[1]].url),
        axios.get(pokemonList.data.results[ids[2]].url)
    ])
    // save names in array
    let names = pokemon.map(p => p.data.name)
    // get species info
    let species = await Promise.all(pokemon.map(p => axios.get(p.data.species.url)))
    // find english flavor text entry from species info and map to array 
    let descriptions = species.map(s => s.data.flavor_text_entries.find(entry => entry.language.name === 'en'));
    // print name & description
    descriptions.forEach((d,i) => console.log(`${names[i]}: ${d.flavor_text}`));
}