import { useFetch } from "../hooks/useFetch.js";
import PokemonPreview from "../ui/PokemonPreview.jsx";
import { useState, useEffect } from "react";
function Lobby() {

  const [pokemons, setPokemons] = useState([]);
  const [pokeTypesState, setPokeTypesState] = useState([]);

  const [error, pokeApiResult] = useFetch(import.meta.env.VITE_SERVER_URL + "/pokemon");
  const [error2, pokeTypes] = useFetch('https://pokeapi.co/api/v2/type');

  console.log("pokeTypes",pokeTypes);
  // console.log("posts",pokeApiResult);

  const handleFilter = (e) => {
    const value = e.target.value;
    if (value === "all"){
      console.log("pokeApiResult",pokeApiResult)
      setPokemons(pokeApiResult);
    } else{
      const filteredPokemons = pokeApiResult.filter((pokemon) => {
        return pokemon.types.includes(value);
      });
      setPokemons(filteredPokemons);
  
    }

    // const filteredPokemons = pokemons.reduce((acc, cur)=>
    // { 
    //   if (cur.type.includes(value)){
    //     acc.push(cur)
    //   } 
    //     return acc
    // }, []);

  }

  useEffect(()=>{
    if (pokeApiResult?.length>0){
      setPokemons(pokeApiResult);
    }
  }, [pokeApiResult]);

  useEffect(()=>{
    console.log("Hi",pokeTypes.results)
    if (pokeTypes?.results?.length>0){
      setPokeTypesState(pokeTypes.results);
    }
  }, [pokeTypes]);

  return (
    <>
    <div className="filterButtons">
      <button onClick={handleFilter} value="all">All</button>
      {pokeTypesState.map((type, index)=>{
        return (
        <button key={`type-${index}`} onClick={handleFilter} value={type.name}>{type.name[0].toUpperCase() + type.name.slice(1)}</button>
      )})}
    </div>
    <div className="pokemongrid">
      {pokemons?.map((pokemon, index) => (
            <PokemonPreview key={`pokemon-${index}`}  pokemon={pokemon} />
        ))}
    </div>
    </>
  );
}
 
export default Lobby;
