import { Link } from "react-router-dom";
import { useFetch } from "../hooks/useFetch.js";
import PokemonPreview from "../ui/PokemonPreview.jsx";
 import Button from "../ui/Button.jsx";

function Startpage() {
  return (
    <div>
       Hello Startpage
       <Button text="Pokemon" url="/pokemon" />
    </div>
  );
}
 
export default Startpage;
