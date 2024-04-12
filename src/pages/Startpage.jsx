import { useEffect } from "react";
import { useBackgroundImage } from "../context/BackgroundImageContext.jsx";
import Button from "../ui/Button.jsx";
import Logo from '../font/pokefight_bg.png';
import Background from '../background/start.png';
import StartButton from '../font/start.png';

function Startpage() {

  const { setBackgroundImage } = useBackgroundImage();

  useEffect(() => {
    setBackgroundImage(Background);
  }, []);

return (
  <div>
    <img src={Logo} alt="PokeFight" />
    <div>
      <Button img={StartButton} url="/lobby" />
    </div>
  </div>
);
}

export default Startpage;