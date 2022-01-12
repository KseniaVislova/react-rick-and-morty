import React, { useState, useReducer, useEffect } from "react";

const initialState = {
  items: [],
}

function App() {
  const [characters, setCharacters] = useState(initialState.items);
  const [isLoading, setLoading] = useState(true);

  useEffect(async function getCharacters() {
    try {
      let res = await fetch("https://rickandmortyapi.com/api/character")
      res = await res.json()
      console.log(res)
      setCharacters(res.results)
      setLoading(false)
    } catch { 
      console.log('Error')
    } 
  }, [])

  

  return (
    <div>
      <h1>Rick and Morty</h1>
      {isLoading ? 'Загрузка данных...' :
      <ul>
        {
      characters.map((item) => (
      <li key={item.id}>
        <h3>{item.name}</h3>
        <p>{item.status}</p>
        <p>{item.species}</p>
        <p>{item.type}</p>
      </li>  
      ))
    }
      </ul>
      }
    </div>
  );
}

export default App;
