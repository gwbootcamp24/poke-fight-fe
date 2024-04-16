import { Routes, Route } from "react-router-dom";
import PageLayout from "./ui/PageLayout.jsx";
import Startpage from "./pages/Startpage.jsx";
import Lobby from "./pages/Lobby.jsx";
import Pokemon from "./pages/Pokemon.jsx";
import Stareoff from "./pages/Stareoff.jsx";
import Fightarena from "./pages/Fightarena.jsx";
import Userscore from "./pages/Userscore.jsx";
import Leaderboard from "./pages/Leaderboard.jsx";
import { useFetch } from "./hooks/useFetch.js";

function App() {

  // use later: const [error, user] = useFetch(import.meta.env.VITE_SERVER_URL + "/users/1");

  const user = true;
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
              <Route path="/fightarena/:id" element={<Fightarena />} />
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
