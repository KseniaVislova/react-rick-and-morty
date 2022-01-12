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
  const [buttons, setButtons] = useState([1,2,3,4,5])

  console.log(result)

  const getButtons = () => {
    if (current == 1 || current == 2) {
      setButtons([1,2,3,4,5])
    } else {
      setButtons([current - 2, current - 1, current, current + 1, current + 2])
    }
  }

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
      setCurrent(res.info.next.slice(res.info.next.length - 1) - 1)
      getButtons()
    } catch { 
      console.log('Error')
    } 
  }

  const goToPage = (number) => {
    console.log(number)
    setUrl("https://rickandmortyapi.com/api/character" + "?page=" + number)
    getCharacters()
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
        <ul>
          {buttons.map((item) => (
            <li key={item}><button onClick={() => goToPage(item)}>{item}</button></li>
          ))}
        </ul>
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
