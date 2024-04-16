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
  const apiUrl = `${import.meta.env.VITE_SERVER_URL}/pokemon/${id.toString()}`;
  
  const [error, pokemonData] = useFetch(apiUrl);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const { name, types = [], abilities = [], stats = [] } = pokemonData;

  return (
    <div className="m-2 mx-auto w-2/3 border-2 p-2 text-center">
      <img className="title" src={Title}/>
      <img className="yourPokemon" src={yourPokemon}/>
      <Button className="leaderboard-btn" img={Leaderboard} url="/leaderboard" />
      <img
        alt={name}
        src={`${import.meta.env.VITE_SERVER_URL}/sprites/pokemon/other/official-artwork/${id}.png`}
      />
      <h2>{name}</h2>
      <p>Type: {types.map((type)=>(type + ', '))}</p>
      <p>Abilities: {abilities.map((ability)=>(ability + ', '))}</p>
      <p>Stats: ${stats}</p>
      <Button img={Back} url="/lobby" />
      <Button img={Fight} url={`/stareoff/${id}`} />
    </div>
  );
}

export default Pokemon;
