import React, { useEffect } from "react";
import { useBackgroundImage } from "../context/BackgroundImageContext.jsx";
import Button from "../ui/Button.jsx";

function Startpage() {

  const { setBackgroundImage } = useBackgroundImage();

  useEffect(() => {
    setBackgroundImage('https://ballonkunst-herzog.de/wp-content/uploads/2022/01/Ballons.png');
  }, []);

return (
  <div>
    <div>
      Das hier ist die Startpage mit dem Logo in der Mitte
    </div>
    <div>
      <Button text="Start game" url="/lobby" />
    </div>
  </div>
);
}

export default Startpage;