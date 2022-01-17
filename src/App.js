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
  const [isPrev, setPrev] = useState(true)
  const [isNext, setNext] = useState(false)

  const cheakPage = (number) => {
    if (number <= pages && number > 0) return true;
  }

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
      console.log(res.info.next.length)
      console.log(res.info.next.split('='))
      setCurrent((res.info.next.split('=')[1] - 1))
      getButtons()
    } catch { 
      console.log('Error')
    } 
  }

  const getButtons = () => {
    let array = [current - 2, current - 1, current, current + 1, current + 2];
    let result = [];
    if (current === 1 || current === 2) {
      setButtons([1,2,3,4,5])
      setNext(true)
    } else {
      array.forEach(item => {
        if(cheakPage(item)) result.push(item)
      })
      setButtons(result)
      setPrev(true)
      console.log(result[result.length - 1] )
    }
  }

  const goToPage = (number) => {
    console.log("Начало выполнения функции")
    setUrl("https://rickandmortyapi.com/api/character" + "?page=" + number)
    setCurrent(number)
    console.log(url)
    console.log("Переход на страницу")
  }

  const getNextPage = () => {
    console.log(result)
    setUrl(result.info.next)
    console.log("Кнопка")
    if (current === pages) {
      setNext(false)
    }
  }

  const getPrevPage = () => {
    setUrl(result.info.prev)
    console.log("Кнопка")
    if (current === 1) {
      setPrev(false)
    }
  }

  const checkDisabled = () => {
    setPrev(true)
    setNext(true)
    if (current === pages) {
      setNext(false)
    }
    if (current === 1) {
      setPrev(false)
    }
  }

  useEffect(() => {
    console.log("Сработал useEffect2")
    console.log(url)
    getCharacters()
  }, [url])

  useEffect(() => {
    getButtons()
    checkDisabled()
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
        {isPrev ? <button onClick={getPrevPage}>Prev Page</button> : <button onClick={getPrevPage} disabled>Prev Page</button> }
        <ul>
          <li><button onClick={() => goToPage(1)}>Start</button></li>
          {buttons.map((item) => (
            <li key={item}><button onClick={() => goToPage(item)}>{item}</button></li>
          ))}
          <li><button onClick={() => goToPage(pages)}>End</button></li>
        </ul>
        {isNext ? <button onClick={getNextPage}>Next Page</button> : <button onClick={getNextPage} disabled>Next Page</button>}
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
