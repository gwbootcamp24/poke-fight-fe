// import { useEffect } from "react";
// import { useParams } from "react-router-dom";
// import { useFetch } from "../hooks/useFetch";
// import { useBackgroundImage } from "../context/BackgroundImageContext.jsx";
// import BackgroundImg from '../background/choose.png';
// import Button from "../ui/Button.jsx";
// import Leaderboard from '../font/leaderboard.png';
// import Back from '../font/back.png';
// import Fight from '../font/start.png';
// import Title from '../font/pokefight_sm.png';
// import yourPokemon from '../font/yourpokemon.png';

// function Pokemon() {

//   const { setBackgroundImage } = useBackgroundImage();

//   useEffect(() => {
//     setBackgroundImage(BackgroundImg);
//   }, []);

//   const { id } = useParams();
//   const apiUrl = `https://pokeapi.co/api/v2/pokemon/${id}`;
  
//   const [error, pokemonData] = useFetch(apiUrl);

//   if (error) {
//     return <div>Error: {error.message}</div>;
//   }

//   const { name, types = [], abilities = [], stats = [] } = pokemonData;

//   return (
//     <div className="m-2 mx-auto w-2/3 border-2 p-2 text-center">
//       <div className="detail-menu">
//         <img className="title" src={Title}/>
//         <img className="yourPokemon" src={yourPokemon}/>
//         <Button className="leaderboard-btn" img={Leaderboard} url="/leaderboard"/>
//       </div>
//       <div className="pokemon-detail-grid">
//         <div className="stats">
//           <h2>Name: {name}</h2>
//           <p>Type: {types.length > 0 && types.map(type => type.type.name).join(" | ")}</p>
//           <p>Abilities: {abilities.length > 0 && abilities.map(ability => ability.ability.name).join(", ")}</p>
//           <p>Stats: {stats.length > 0 && stats.map(stat => `${stat.base_stat} ${stat.stat.name}`).join(", ")}</p>
//         </div>
//         <img className="pokemonId"
//           alt={name}
//           src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`}
//         />
//         <div className="emptyDiv"></div>
//       </div>
//       <div>
//        <Button className="btn-back" img={Back} url="/lobby" />
//        <Button className="btn-start" img={Fight} url={`/stareoff/${id}`} />
//       </div>
//     </div>
//   );
// }

// export default Pokemon;

import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import { useBackgroundImage } from "../context/BackgroundImageContext.jsx";
import BackgroundImg from '../background/choose.png';
import Button from "../ui/Button.jsx";
import Leaderboard from '../font/leaderboard.png';
import Back from '../font/back.png';
import Fight from '../font/start.png';
import Title from '../font/pokefight_sm.png';
import yourPokemon from '../font/yourpokemon.png';

function Pokemon() {

  const { setBackgroundImage } = useBackgroundImage();

  useEffect(() => {
    setBackgroundImage(BackgroundImg);
  }, []);

  const { id } = useParams();
  // const apiUrl = `https://pokeapi.co/api/v2/pokemon/${id}`;
  const apiUrl = `${import.meta.env.VITE_SERVER_URL}/pokemon/${id.toString()}`;
  console.log(apiUrl)
  const [error, pokemonData] = useFetch(apiUrl);
  console.log("pokemonData",pokemonData)

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const { name, types = [], abilities = [], stats = [] } = pokemonData;

  return (
    <div className="m-2 mx-auto w-2/3 border-2 p-2 text-center">
      <div className="detail-menu">
        <img className="title" src={Title}/>
        <img className="yourPokemon" src={yourPokemon}/>
        <Button className="leaderboard-btn" img={Leaderboard} url="/leaderboard"/>
      </div>
      <div className="pokemon-detail-grid">
        <div className="stats">
          <h2>Name: {name}</h2>
          <p>Type: {types.map((type)=>(type + ', '))}</p>
          <p>Abilities:{abilities.map((ability)=>(ability + ', '))}</p>
          <p>Stats: ${stats}</p>
        </div>
        <img className="pokemonId"
          alt={name}
          src={`${import.meta.env.VITE_SERVER_URL}/sprites/pokemon/other/official-artwork/${id}.png`}
        />
        <div className="emptyDiv"></div>
      </div>
      <div>
       <Button className="btn-back" img={Back} url="/lobby" />
       <Button className="btn-start" img={Fight} url={`/stareoff/${id}`} />
      </div>
    </div>
  );
}

export default Pokemon;

