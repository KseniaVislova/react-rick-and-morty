import React, { useState, useReducer, useEffect } from "react";
import styles from './App.module.css'

const initialState = {
  items: [],
}

function App() {
  const [result, setResult] = useState({});
  const [characters, setCharacters] = useState(initialState.items);
  const [isLoading, setLoading] = useState(true);
  const [url, setUrl] = useState("https://rickandmortyapi.com/api/character");
  const [pages, setPages] = useState(null)
  const [count, setCount] = useState(null)
  const [current, setCurrent] = useState('1')

  console.log(result)

  async function getCharacters() {
    setLoading(true)
    try {
      let res = await fetch(url)
      res = await res.json()
      console.log(res)
      setCharacters(res.results)
      setLoading(false)
      setResult(res)
      setPages(res.info.pages)
      setCount(res.info.count)
      console.log(res.info.next.slice(res.info.next.length - 1))
      setCurrent(res.info.next.slice(res.info.next.length - 1) - 1)
    } catch { 
      console.log('Error')
    } 
  }

  const getNextPage = () => {
    console.log(result)
    setUrl(result.info.next)
    getCharacters()
  }

  const getPrevPage = () => {
    setUrl(result.info.prev)
    getCharacters()
  }

  useEffect(getCharacters, [])

  

  return (
    <div>
      <h1>Rick and Morty</h1>
      {isLoading ? 'Загрузка данных...' :
      <div>
        <div>All Characters: {count}</div>
        <div>Pages: {pages}</div>
        <div>Current page: {current}</div>
        <button onClick={getPrevPage}>Prev Page</button>
        <button onClick={getNextPage}>Next Page</button>
        <ul className={styles.list}>
          {characters.map((item) => (
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
      </div>
      }
    </div>
  );
}

export default App;
