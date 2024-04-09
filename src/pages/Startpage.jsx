import { Link } from "react-router-dom";
import { useFetch } from "../hooks/useFetch.js";
import Button from "../ui/Button.jsx";

function Startpage() {
  return (
    <>
      <div>
        Das hier ist die Startpage mit dem Logo in der Mitte
      </div>
      <div>
        <Button text="Start game" url="/lobby" />
      </div>
    </>
  );
}
 
export default Startpage;
