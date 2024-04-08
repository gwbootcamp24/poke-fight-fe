import { useFetch } from "../hooks/useFetch.js";
import PokemonPreview from "../ui/PokemonPreview.jsx";

function Pokemon() {
  const [error, pokeApiResult] = useFetch(import.meta.env.VITE_SERVER_URL + "/pokemon");
  console.log("error",error);
  console.log("posts",pokeApiResult);
  return (
    <div>
      {pokeApiResult?.map((pokemon) => (
            <PokemonPreview key={`pokemon-${pokemon.id}`}  pokemon={pokemon} />
        ))}
    </div>
  );
}
 
export default Pokemon;
