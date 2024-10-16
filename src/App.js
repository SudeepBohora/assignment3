import "./App.css";
import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch Pokémon data from the API
  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon?limit=10")
      .then((response) => response.json())
      .then((data) => {
        setPokemon(data.results);
        setLoading(false);
      });
  }, []);

  return (
    <div className="app">
      <h1 className="title">Pokémon Gallery</h1>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="pokemon-container">
          {pokemon.map((poke, index) => (
            <PokemonCard key={index} name={poke.name} url={poke.url} />
          ))}
        </div>
      )}
    </div>
  );
}

// Component for each Pokémon card
function PokemonCard({ name, url }) {
  const [pokemonData, setPokemonData] = useState(null);

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setPokemonData(data);
      });
  }, [url]);

  return (
    pokemonData && (
      <div className="pokemon-card">
        <img
          src={pokemonData.sprites.front_default}
          alt={pokemonData.name}
          className="pokemon-image"
        />
        <h2>
          {pokemonData.name.charAt(0).toUpperCase() + pokemonData.name.slice(1)}
        </h2>
        <p>Height: {pokemonData.height}</p>
        <p>Weight: {pokemonData.weight}</p>
      </div>
    )
  );
}

export default App;
