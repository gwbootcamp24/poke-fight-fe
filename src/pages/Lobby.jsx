import { useFetch } from "../hooks/useFetch.js";
import PokemonPreview from "../ui/PokemonPreview.jsx";
import { useState, useEffect } from "react";
import Button from "../ui/Button.jsx";
import ButtonIcons from "../ui/ButtonIcons.jsx";

import { useBackgroundImage } from "../context/BackgroundImageContext.jsx";
import BackgroundImg from '../background/choose.png';
import HomeButton from '../font/pokefight_sm.png';
import Headline from '../font/chooseyourpokemon.png';
import LeaderboardButton from '../font/leaderboard.png';


function Lobby() {
  const [pokemons, setPokemons] = useState([]);
  const [pokeTypesState, setPokeTypesState] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pokemonPerPage] = useState(20);
  const [filteredPokemons, setFilteredPokemons] = useState([]);

  const [error, pokeApiResult] = useFetch(import.meta.env.VITE_SERVER_URL + "/pokemon");
  const [error2, pokeTypes] = useFetch('https://pokeapi.co/api/v2/type');

  const { setBackgroundImage } = useBackgroundImage();

  useEffect(() => {
    setBackgroundImage(BackgroundImg);
  }, [setBackgroundImage]);

  useEffect(() => {
    if (pokeApiResult?.length > 0) {
      setPokemons(pokeApiResult);
    }
  }, [pokeApiResult]);

  useEffect(() => {
    if (pokeTypes?.results?.length > 0) {
      setPokeTypesState(pokeTypes.results);
    }
  }, [pokeTypes]);

  useEffect(() => {

    const indexOfLastPokemon = currentPage * pokemonPerPage;
    const indexOfFirstPokemon = indexOfLastPokemon - pokemonPerPage;
    const currentPokemons = pokemons.slice(indexOfFirstPokemon, indexOfLastPokemon);
    setFilteredPokemons(currentPokemons);
  }, [currentPage, pokemons, pokemonPerPage]);

  const handleFilter = (e) => {
    const value = e.currentTarget.value;
    if (value === "all") {
      setFilteredPokemons(pokeApiResult);
    } else {
      const filteredPokemons = pokeApiResult.filter((pokemon) => {
        return pokemon.types.includes(value);
      });
      setFilteredPokemons(filteredPokemons);
    }
  }


  return (
    <>

    <div className="lobby-container"> 

      <div className="lobbyheader">
          {/* <img src={HomeButton} alt="Home" className="home-button" onClick={goToStartPage}/> */}
          <Button className="home-button" img={HomeButton} url="/"/>
          <img src={Headline} alt="headline" className="headline"/>
          {/* <img src={LeaderboardButton} alt="Leaderboard" className="leaderboard-button" onClick={goToLeaderboard} /> */}
          <Button className="leaderboard-button" img={LeaderboardButton} url="/leaderboard"/>
      </div>
    
      <div className="pokemongrid">
      {filteredPokemons?.map((pokemon, index) => (

            <PokemonPreview key={`pokemon-${index}`}  pokemon={pokemon} />
        ))}
      <div className="lobbyfooter"> 
        <div className="previous">
        <button onClick={() => setCurrentPage(currentPage > 1 ? currentPage - 1 : 1)}>Previous</button>
       </div>

        <div className="filterButtons">
        <button onClick={handleFilter} value="all" style={{ background: "transparent"}}>
          All
        </button>
        {pokeTypesState.map((type) => {
          const icons = ButtonIcons;
          return (
            <button key={type.name} onClick={handleFilter} value={type.name} style={{ background: "transparent", border: "none", padding: "0", margin: "0" }}>
              <img src={icons[type.name]} alt={type.name} style={{ display: "block", width: "40px", height: "40px", margin: "10px"}} />
              <span style={{ display: "block", textAlign: "center", }}>{type.name[0].toUpperCase() + type.name.slice(1)}</span>
            </button>
          );
        })}
      </div>
      <div className="next">
      <button onClick={() => setCurrentPage(currentPage + 1)}>Next</button>
      </div>
      </div>
    </div>

    </div>
    
    </>
  );
}
 
export default Lobby;
