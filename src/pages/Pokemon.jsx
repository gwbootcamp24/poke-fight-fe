import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import Button from "../ui/Button.jsx"

function Pokemon() {
  const { id } = useParams();
  const apiUrl = `https://pokeapi.co/api/v2/pokemon/${id}`;
  
  const [error, pokemonData] = useFetch(apiUrl);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const { name, types = [], abilities = [], stats = [] } = pokemonData;

  return (
    <div className="m-2 mx-auto w-2/3 border-2 border-dashed border-gray-700 bg-gray-100 p-2 text-center">
      <Button text="Leaderboard" url="/leaderboard" />
      <h2>Your Pokemon: {name}</h2>
      <img
        alt={name}
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`}
      />
      <p>Type: {types.length > 0 && types.map(type => type.type.name).join(" | ")}</p>
      <p>Abilities: {abilities.length > 0 && abilities.map(ability => ability.ability.name).join(", ")}</p>
      <p>Stats: {stats.length > 0 && stats.map(stat => `${stat.base_stat} ${stat.stat.name}`).join(", ")}</p>
      <Button text="Go back" url="/lobby" />
      <Button text="Start fight!" url={`/stareoff/${id}`} />
    </div>
  );
}

export default Pokemon;
