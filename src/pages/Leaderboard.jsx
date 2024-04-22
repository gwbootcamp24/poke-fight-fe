import { useEffect } from "react";
import { useState } from "react";
import { useBackgroundImage } from "../context/BackgroundImageContext.jsx";
import { useFetch } from "../hooks/useFetch";
import Button from "../ui/Button.jsx";
import Title from '../font/pokefight_sm.png';
import Background from '../background/highscore.png';
import StartButton from '../font/newgame.png';
import Highscore from '../font/highscore.png';


function Leaderboard() {

  const { setBackgroundImage } = useBackgroundImage();

  useEffect(() => {
    setBackgroundImage(Background);
  }, []);


  const [highscores, setHighscores] = useState([]);
  const [error, highscoreApiResult] = useFetch(import.meta.env.VITE_SERVER_URL + "/highscore");

  
  useEffect(()=>{
    if (highscoreApiResult?.length>0){
      setHighscores(highscoreApiResult);
    }
  }, [highscoreApiResult]);


  return (
    <>
    <div className="m-2 mx-auto w-2/3 border-2 p-2 text-center">    
      <img className="title" src={Title} alt="PokeFight" />
      <img className="leaderboard-highscore" src={Highscore} alt="Highscore" />
    </div>
      <div className="leaderboard-highscore-table">
        
            
              {highscores
              .sort( (a,b) => a.score < b.score ? 1 : -1)
              .map(highscores => {
                return(
                  <div className="leaderboard-highscore-table-row" key={highscores.id}>
                    <p>{highscores.player} - {highscores.score}</p>
                  </div>
                )
              })}
        
      </div>

      
    <div className="leaderboard-startPage-btn img">
      <Button img={StartButton} url="/lobby"/>
    </div>
    </>
  )
}

export default Leaderboard;
