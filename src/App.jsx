import { Routes, Route } from "react-router-dom";
import PageLayout from "./ui/PageLayout.jsx";
import Home from "./pages/Home.jsx";
import Pokemon from "./pages/Pokemon.jsx";
import Startpage from "./pages/Startpage.jsx";
import { useFetch } from "./hooks/useFetch.js";

function App() {

  // use later: const [error, user] = useFetch(import.meta.env.VITE_SERVER_URL + "/users/1");

  const user = true;
  return (
    <>
      <Routes>

        <Route path="/" element={<PageLayout />}>
          <Route path="/hello" element={<Startpage />} />
          <Route index element={<Startpage />} />
          {user && (
            <>
              <Route path="/pokemon" element={<Pokemon />} />
            </>
          )}
          <Route path="*" element={<h1>Not found!</h1>} />
        </Route>
        
      </Routes>
    </>
  );
}

export default App;
