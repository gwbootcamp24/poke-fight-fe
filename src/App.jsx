import { Routes, Route, useLocation, useNavigate  } from "react-router-dom";
import PageLayout from "./ui/PageLayout.jsx";
import Startpage from "./pages/Startpage.jsx";
import Lobby from "./pages/Lobby.jsx";
import Pokemon from "./pages/Pokemon.jsx";
import Stareoff from "./pages/Stareoff.jsx";
import Fightarena from "./pages/Fightarena.jsx";
import Userscore from "./pages/Userscore.jsx";
import Leaderboard from "./pages/Leaderboard.jsx";
import { useFetch } from "./hooks/useFetch.js";
import { useState, useEffect } from "react";
 
function App() {

  // use later: const [error, user] = useFetch(import.meta.env.VITE_SERVER_URL + "/users/1");
  const navigate = useNavigate();
  const user = true;
  const [game, setGame] = useState({});
  const [testpokemon1Data, setTestpokemon1Data] = useState({});
  const [testpokemon2Data, setTestpokemon2Data] = useState({});
  const testpokemon1 = 3;
  const testpokemon2 = 5;
  const apiUrl1 = `${import.meta.env.VITE_SERVER_URL}/pokemon/${testpokemon1}`;
  const apiUrl2 = `${import.meta.env.VITE_SERVER_URL}/pokemon/${testpokemon2}`;
  let location = useLocation();
  let errortestpokemon1Data, errortestpokemon2Data
  // console.log(location );




useEffect(()=>{

  if (testpokemon1Data&&testpokemon2Data&&Object.keys(testpokemon1Data).length > 0 && Object.keys(testpokemon2Data).length > 0) {
    
    // console.log("was here navigate",game)

    navigate("./fightarena/");
  }
},[game]);


useEffect(()=>{

  if (location.pathname.match(/fightTest/)){
    const loader = async () => {
      const p1Data = await fetchDataWithoutHook(apiUrl1);
      const p2Data = await fetchDataWithoutHook(apiUrl2);

      setTestpokemon1Data(p1Data)
      setTestpokemon2Data(p2Data)

      async function fetchDataWithoutHook(url) {
        try {
          const res = await fetch(url);
          if (!res.ok) throw new Error("Request failed");
          const data = await res.json();
  
          //  console.log("data",data)
                
          return(data);

        } catch (error) {
          // console.log("error",url);
        }
      }
  

      if (Object.keys(testpokemon1Data).length > 0 && Object.keys(testpokemon2Data).length > 0) {
        // console.log("testpokemon1Data fetched")
      }
      return null;
    };
    loader();
  }

},[]);
  
    const getPlayerstats = (pokemonData) => {
      // console.log("pokemonData" );
      let playerStats = pokemonData.stats.split(/ /);
      let player = {...pokemonData, 
        hp:playerStats[0],
        attack:playerStats[2],
        defense:playerStats[4],
        specialAttack:playerStats[6],
        specialDefense:playerStats[8]
      };
      return player;
    }

    useEffect(()=>{
      if (testpokemon1Data&&testpokemon2Data&&Object.keys(testpokemon1Data).length > 0 && Object.keys(testpokemon2Data).length > 0) {
        let player1 = getPlayerstats(testpokemon1Data);
        let player2 = getPlayerstats(testpokemon2Data);
        // console.log("player1", player1); 
        // console.log("player2", player2);
        setGame({playerPokemon: player1, enemyPokemon: player2})
      }
    },[testpokemon1Data]);

  

  return (
    <>
      <Routes>

        <Route path="/" element={<PageLayout />}>
          <Route index element={<Startpage />} />
          {user && (
            <>
              <Route path="/lobby" element={<Lobby />} />
              <Route path="/pokemon/:id" element={<Pokemon />} />
              <Route path="/stareoff/:id" element={<Stareoff />} />
              <Route path="/fightTest/" element={<Startpage />} />
              <Route path="/fightarena/" element={<Fightarena {...game} />} />
              <Route path="/userscore" element={<Userscore />} />
              <Route path="/leaderboard" element={<Leaderboard />} />
            </>
          )}
          <Route path="*" element={<h1>Not found!</h1>} />
        </Route>
        
      </Routes>
    </>
  );
}

export default App;
