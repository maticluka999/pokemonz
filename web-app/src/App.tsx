import { useState } from 'react';

function App() {
  const [pokemonName, setPokemonName] = useState('');
  const [pokemon, setPokemon] = useState<any>();

  const fetchPokemon = async () => {
    if (!pokemonName) {
      return;
    }

    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
    );

    if (response.status === 200) {
      const result = await response.json();
      setPokemon(result);
    } else if (response.status === 404) {
      alert('No such pokemon :(');
    } else {
      alert('Unknown error occurred :/');
    }
  };

  return (
    <div style={{ padding: '0 20px' }}>
      <h1>Pokemonz web app</h1>
      <div style={{ margin: '20px 0' }}>
        <label>
          Pokemon name:
          <input
            style={{ margin: '0 10px' }}
            onChange={(e) => setPokemonName(e.target.value)}
          />
        </label>
        <button onClick={fetchPokemon}>Show pokemon info</button>
      </div>
      {pokemon && (
        <div>
          Pokemon info:
          <div style={{ padding: '10px' }}>
            <div>Name: {pokemon.name}</div>
            <img src={pokemon.sprites.front_default} alt='pokemon pic' />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
