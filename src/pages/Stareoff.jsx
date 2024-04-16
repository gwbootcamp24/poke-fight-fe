import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useFetch } from "../hooks/useFetch.js";
import Button from "../ui/Button.jsx";

function Stareoff() {
  const { id: selectedPokemonId } = useParams();
  const selectedPokemonUrl = `${import.meta.env.VITE_SERVER_URL}/pokemon/${selectedPokemonId}`;
  console.log(selectedPokemonUrl);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [randomPokemon, setRandomPokemon] = useState(null);
  const [randomId, setRandomId] = useState(null);
  
  const [errorSelectedPokemon, pokemonData] = useFetch(selectedPokemonUrl);
  console.log("pokemonData",pokemonData);


  useEffect(()=>{
    if (Object.keys(pokemonData).length > 0){
      setSelectedPokemon(pokemonData);
    }
  }, [pokemonData]);


  // Zufälliges Pokemon generieren
  useEffect(()=>{
    const randomId = Math.floor(Math.random() * 1025) + 1; // Zufällige ID zwischen 1 und 1025
    setRandomId(randomId)
  }, []);

  const randomPokemonUrl = `${import.meta.env.VITE_SERVER_URL}/pokemon/${randomId}`;
  const [errorRandomPokemon, randomPokemonData] = useFetch(randomPokemonUrl);

  useEffect(()=>{
    if (Object.keys(randomPokemonData).length > 0){
      setRandomPokemon(randomPokemonData);
    }
  }, [randomPokemonData]);
  
    
  // Wenn die Daten noch geladen werden, zeige "Loading..."
  if (!selectedPokemon || !randomPokemon) {
    return <div>Loading...</div>;
  }

  return (
    <div className="stareoff">
      <Button text="Leaderboard" url="/leaderboard" />
      <div className="selected-pokemon">
        <h2>Your Pokemon:</h2>
        <img
          alt={selectedPokemon.name}
          src={`${import.meta.env.VITE_SERVER_URL}/sprites/pokemon/other/official-artwork/${selectedPokemon.id}.png`}
        />
        <p>{selectedPokemon.name}</p>
      </div>
      <div className="random-pokemon">
        <h2>Your Opponent:</h2>
        <img
          alt={randomPokemon.name}
          src={`${import.meta.env.VITE_SERVER_URL}/sprites/pokemon/other/official-artwork/${randomPokemon.id}.png`}
        />
        <p>{randomPokemon.name}</p>
      </div>
      {/* Link zurück zur Pokemon-Komponente */}
      <Button text="Go back" url={`/pokemon/${selectedPokemonId}`} />
      <Button text="Fight!" url={`/fightarena/${selectedPokemonId}`} />
    </div>
  );
}

export default Stareoff;

