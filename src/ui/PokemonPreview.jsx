import { Link } from "react-router-dom";
function PokemonPreview(pokemon) {
  console.log(pokemon);
    const { name, id, types, abilities, stats } = pokemon.pokemon
    const elementTypes = types.map(typeInfo => typeInfo.type.name);
    const pokemonAbilities = abilities.map(ability => ability.ability.name);
    const statsInfo = stats.map(stat => stat.base_stat + ' ' + stat.stat.name);

   return (


    
    <div  className="m-2 mx-auto w-2/3 border-2 border-dashed border-gray-700 bg-gray-100 p-2 text-center">
      <ul>
      <Link to={`/pokemon/${id}`}>
        <li className={`card ${elementTypes[0]}`} data-id={id} data-name={name}>
            <img className="card-image" alt={name} src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`} />
            <h2 className="card-title">${id}. ${name}</h2>
            <p className="card-subtitle">Type: ${elementTypes.join(' | ')}</p>
            <p className="card-subtitle">Abilities: ${pokemonAbilities.join(', ')}</p>
            <p className="card-subtitle">Stats: ${statsInfo.join(', ')}</p>
        </li>
        </Link>
        </ul>
    </div>
        
        


      
  );
}

export default PokemonPreview;
