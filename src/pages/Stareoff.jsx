import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useFetch } from "../hooks/useFetch.js";

function Stareoff() {
  const { id: selectedPokemonId } = useParams();
  const selectedPokemonUrl = `https://pokeapi.co/api/v2/pokemon/${selectedPokemonId}`;
  
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [randomPokemon, setRandomPokemon] = useState(null);

  // Daten des ausgewählten Pokemons abrufen
  useEffect(() => {
    const fetchSelectedPokemon = async () => {
      try {
        const res = await fetch(selectedPokemonUrl);
        if (!res.ok) {
          throw new Error("Failed to fetch selected Pokemon");
        }
        const data = await res.json();
        setSelectedPokemon(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchSelectedPokemon();
  }, [selectedPokemonUrl]);

  // Zufälliges Pokemon generieren
  useEffect(() => {
    const randomId = Math.floor(Math.random() * 898) + 1; // Zufällige ID zwischen 1 und 898
    const randomPokemonUrl = `https://pokeapi.co/api/v2/pokemon/${randomId}`;
    const fetchRandomPokemon = async () => {
      try {
        const res = await fetch(randomPokemonUrl);
        if (!res.ok) {
          throw new Error("Failed to fetch random Pokemon");
        }
        const data = await res.json();
        setRandomPokemon(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchRandomPokemon();
  }, []);

  // Wenn die Daten noch geladen werden, zeige "Loading..."
  if (!selectedPokemon || !randomPokemon) {
    return <div>Loading...</div>;
  }

  return (
    <div className="stareoff">
      <Link to="/leaderboard">Leaderboard</Link>
      <div className="selected-pokemon">
        <h2>Your Pokemon:</h2>
        <img
          alt={selectedPokemon.name}
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${selectedPokemon.id}.png`}
        />
        <p>Name: {selectedPokemon.name}</p>
      </div>
      <div className="random-pokemon">
        <h2>Your Opponent:</h2>
        <img
          alt={randomPokemon.name}
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${randomPokemon.id}.png`}
        />
        <p>Name: {randomPokemon.name}</p>
      </div>
      {/* Link zurück zur Pokemon-Komponente */}
      <Link to={`/pokemon/${selectedPokemonId}`}>Go back</Link>
      <Link to={`/fightarena/${selectedPokemonId}`}>Fight!</Link>
    </div>
  );
}

export default Stareoff;

