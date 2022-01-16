import { render } from "@testing-library/react";
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
  const [current, setCurrent] = useState(1)
  const [buttons, setButtons] = useState([1,2,3,4,5])

  const getCharacters = async() => {
    setLoading(true)
    try {
      let res = await fetch(url)
      res = await res.json()
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

  const getButtons = () => {
    if (current === 1 || current === 2) {
      setButtons([1,2,3,4,5])
    } else {
      setButtons([current - 2, current - 1, current, current + 1, current + 2])
    }
  }

  const goToPage = (number) => {
    console.log("Начало выполнения функции")
    setUrl("https://rickandmortyapi.com/api/character" + "?page=" + number)
    console.log(url)
    console.log("Переход на страницу")
  }

  const getNextPage = () => {
    console.log(result)
    setUrl(result.info.next)
    console.log("Кнопка")
  }

  const getPrevPage = () => {
    setUrl(result.info.prev)
    console.log("Кнопка")
  }

  useEffect(() => {
    console.log("Сработал useEffect2")
    console.log(url)
    getCharacters()
  }, [url])

  useEffect(() => {
    getButtons()
  }, [current])

  return (
    <div>
      <h1>Rick and Morty</h1>
      {isLoading ? 'Загрузка данных...' :
      <div>
        <div>Current URL: {url}</div>
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
