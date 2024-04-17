import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useFetch } from "../hooks/useFetch.js";
import { useBackgroundImage } from "../context/BackgroundImageContext.jsx";
import Button from "../ui/Button.jsx";
import Title from '../font/pokefight_sm.png';
import Leaderboard from '../font/leaderboard.png';
import Back from '../font/back.png';
import Fight from '../font/start.png';
import Arena1 from '../background/arena_01.png';
import Arena2 from '../background/arena_02.png';
import Arena3 from '../background/arena_03.png';
import Arena4 from '../background/arena_04.png';
import Arena5 from '../background/arena_05.png';
import Arena6 from '../background/arena_06.png';

function Stareoff() {

  const { setBackgroundImage } = useBackgroundImage();

  useEffect(() => {
    const backgroundPool = [Arena1, Arena2, Arena3, Arena4, Arena5, Arena6];
    const randomIndex = Math.floor(Math.random() * backgroundPool.length);
    const randomBackground = backgroundPool[randomIndex];
    setBackgroundImage(randomBackground);
  }, []);

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
    // <div>
    //   <div className="stareoff-1">
    //     <Button className="title" img={Title} url="/"/>
    //     <Button className="leaderboard-btn" img={Leaderboard} url="/leaderboard"/>
    //   </div>
    //   <div className="stareoff-2">
    //     <div className="selected-pokemon">
    //       <img
    //         alt={selectedPokemon.name}
    //         src={`${import.meta.env.VITE_SERVER_URL}/sprites/pokemon/other/official-artwork/${selectedPokemon.id}.png`}
    //       />
    //       <Button img={Fight} url={`/fightarena/${selectedPokemonId}`} />
    //       <img
    //       alt={randomPokemon.name}
    //       src={`${import.meta.env.VITE_SERVER_URL}/sprites/pokemon/other/official-artwork/${randomPokemon.id}.png`}
    //       />
    //     </div>
    //   </div>
    //   <div className="stareoff-3">
    //     <p>{selectedPokemon.name}</p>
    //     <Button img={Back} url={`/pokemon/${selectedPokemonId}`} />
    //     <p>{randomPokemon.name}</p>
    //   </div>
    // </div>
    <div className="stareoff-container">
      <div className="title">
        <Button img={Title} url="/" />
      </div>
      <div className="empty-div"></div>
      <div className="leaderboard-btn">
        <Button img={Leaderboard} url="/leaderboard"/>
      </div>
      <img className="selected-pokemon-img"
          alt={selectedPokemon.name}
          src={`${import.meta.env.VITE_SERVER_URL}/sprites/pokemon/other/official-artwork/${selectedPokemon.id}.png`}
      />
      <div className="start-btn">
        <Button img={Fight} url={`/fightarena/${selectedPokemonId}`} />
      </div>
      <img className="opponent-img"
      alt={randomPokemon.name}
      src={`${import.meta.env.VITE_SERVER_URL}/sprites/pokemon/other/official-artwork/${randomPokemon.id}.png`}
      />
      <p className="selected-pokemon-name">{selectedPokemon.name}</p>
      <div className="back-btn" >
        <Button img={Back} url={`/pokemon/${selectedPokemonId}`} />
      </div>
      <p className="opponent-name">{randomPokemon.name}</p>
  </div>
  );
}

export default Stareoff;


