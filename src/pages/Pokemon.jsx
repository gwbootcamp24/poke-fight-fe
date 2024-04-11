import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

function Pokemon() {
  const { id } = useParams(); 

  const [pokemonData, setPokemonData] = useState(null);
  const [error, setError] = useState(null);
  const apiUrl = ``;

  useEffect(() => {
    async function fetchPokemonData() {
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error("Failed to fetch Pokemon");
        }
        const data = await response.json();
        setPokemonData(data);
      } catch (error) {
        setError(error.message);
      }
    }

    fetchPokemonData();

  }, [apiUrl, id]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!pokemonData) {
    return <div>Loading...</div>;
  }

  const { name, types, abilities, stats } = pokemonData;


  return (
    <div className="m-2 mx-auto w-2/3 border-2 border-dashed border-gray-700 bg-gray-100 p-2 text-center">
      <Link to="/leaderboard">Leaderboard</Link>
      <h2>Your Pokemon: {name}</h2>
      <img
        alt={name}
        src={``}
      />
      <p>Type: {types.map(type => type.type.name).join(" | ")}</p>
      <p>Abilities: {abilities.map(ability => ability.ability.name).join(", ")}</p>
      <p>Stats: {stats.map(stat => `${stat.base_stat} ${stat.stat.name}`).join(", ")}</p>
      <Link to="/lobby">Go back</Link>
      <Link to="/stareoff">Fight!</Link>
    </div>
  );
}

export default Pokemon;