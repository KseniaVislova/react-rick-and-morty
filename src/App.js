import React, { useState, useReducer, useEffect } from "react";
import styles from './App.module.css'

const initialState = {
  items: [],
}

function App() {
  const [characters, setCharacters] = useState(initialState.items);
  const [isLoading, setLoading] = useState(true);
  const [url, setUrl] = useState("https://rickandmortyapi.com/api/character");
  const [pages, setPages] = useState(null)

  async function getCharacters() {
    try {
      let res = await fetch(url)
      res = await res.json()
      console.log(res)
      setCharacters(res.results)
      setLoading(false)
      setPages(res.info.pages)
      console.log(pages)
    } catch { 
      console.log('Error')
    } 
  }

  const getNextPage = () => {
    setUrl(characters.next)
    setLoading(true)
    getCharacters()
  }

  const getPrevPage = () => {
    setUrl(characters.prev)
    setLoading(true)
    getCharacters()
  }

  useEffect(getCharacters, [])

  

  return (
    <div>
      <h1>Rick and Morty</h1>
      {isLoading ? 'Загрузка данных...' :
      <div>
        <ul className={styles.list}>
        {
      characters.map((item) => (
      <li key={item.id} className={styles.item}>
        <h3>{item.name}</h3>
        <img src={item.image} alt={item.name}/>
        <p>{item.status}</p>
        <p>{item.species}</p>
        <p>{item.type}</p>
      </li>  
      ))
    }
      </ul>
      <div>Pages: {pages}</div>
      <button onClick={getPrevPage}>Prev Page</button>
      <button onClick={getNextPage}>Next Page</button>
      </div>
      }
    </div>
  );
}

export default App;
