import { useState, useEffect } from "react";

export function useFetch(url) {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData(url);
    async function fetchData(url) {
      try {
        const res = await fetch(url);
        // console.log("res",res)
        if (!res.ok) throw new Error("Request failed");
        const data = await res.json();

        // const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=2000");
        // const data = await response.json();
              
        // console.log("data",data)
              
        setData(data);
      } catch (error) {
        console.log("error",error);
        setError(error);
      }
    }
  }, [url]);

  return [error, data];
}
