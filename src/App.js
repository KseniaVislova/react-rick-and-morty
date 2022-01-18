import { render } from "@testing-library/react";
import React, { useState, useReducer, useEffect, useRef, useCallback} from "react";
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
  const [filter, setFilter] = useState({name: '', status: 'all', species: '', type: '', gender: 'all'})
  const [isFilter, setIsFilter] = useState(false)

  const cheakPage = (number) => {
    if (number <= pages && number > 0) return true;
  }

  const getCharacters = async() => {
    setLoading(true)
    try {
      console.log('Start getCharacters')
      let res = await fetch(url)
      res = await res.json()
      setCharacters(res.results)
      setLoading(false)
      setResult(res)
      setPages(res.info.pages)
      setCount(res.info.count)
      if (typeof (res.info.next.split('=')[1]) === 'number') {
        console.log(res.info.next.split('=')[1] - 1)
        setCurrent(res.info.next.split('=')[1] - 1)
      }  else {
        console.log(res.info.next)
        console.log(res.info.next.split('=')[1].split('&')[0] - 1)
        setCurrent(res.info.next.split('=')[1].split('&')[0] - 1)
      }
      console.log('End getCharacters')
    } catch { 
      console.log('Error')
    } 
  }

  const getButtons = () => {
    let array = [current - 2, current - 1, current, current + 1, current + 2];
    let result = [];
    console.log(pages)
    if (pages === 1) {
      setButtons([1])
    }
    if ((current === 1 || current === 2) && pages > 1) {
      setButtons([1,2])
      setNext(true)
    }
    if ((current === 1 || current === 2) && pages > 2) {
      setButtons([1,2,3])
      setNext(true)
    }
    if ((current === 1 || current === 2) && pages > 3) {
      setButtons([1,2,3,4])
      setNext(true)
    }
    if ((current === 1 || current === 2) && pages > 4) {
      setButtons([1,2,3,4,5])
      setNext(true)
    } else {
      console.log("Начало выполнения else в getButtons")
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
    if (filter.name === '' && filter.status === 'all'&& filter.species === ''&& filter.type === ''&& filter.gender === 'all') {
      setUrl("https://rickandmortyapi.com/api/character" + "?page=" + number)
    } else {
      console.log(number)
      console.log(url.includes('page'))
      if (url.includes('page')) {
        let res = url.split('?page=')[1].split('&')
        console.log(res)
        let newUrl = "https://rickandmortyapi.com/api/character/" + "?page=" + number;
        for (let i = 1; i < res.length; i++) {
          newUrl = newUrl + "&" + res[i]
        }
        console.log(newUrl)
        setUrl(newUrl)
      } else {
        let res = url.split('?')
        console.log(res)
        setUrl(res[0] + "?page=" + number + '&' + res[1])
      }
    }

    console.log("Сейчас будет setCurrent")
    setCurrent(number)
    console.log(url)
    console.log("Переход на страницу")
  }

  const getNextPage = () => {
    console.log(result)
    setUrl(result.info.next)
    setCurrent(current + 1)
    console.log("Кнопка")
  }

  const getPrevPage = () => {
    setUrl(result.info.prev)
    setCurrent(current - 1)
    console.log("Кнопка")
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

  const getUrlFilter = () => {
    console.log(filter)
    let newUrl = "https://rickandmortyapi.com/api/character/?"
    let i = 0;
    for (let key in filter) {
      console.log(filter[key])
      if (filter[key] !== '' && filter[key] !== 'all') {
        if (i === 0) {
          newUrl = newUrl + key + "=" + filter[key]
        } else {
          newUrl = newUrl + "&" + key + "=" + filter[key]
        }
      }
      i += 1;
    }
    console.log(newUrl)
    setUrl(newUrl)
  }

  const getValues = async(e) => {
    console.log(e.target[0])
    console.log(Object.keys(e.target))

    const res = {name: e.target[0].value, status: e.target[1].value, species: e.target[2].value, type: e.target[3].value, gender: e.target[4].value}
    console.log(res)
    setFilter(res)
    console.log(filter)
    e.preventDefault()
  }

  const handleClear = (e) => {
    setUrl("https://rickandmortyapi.com/api/character")
    setFilter({name: '', status: 'all', species: '', type: '', gender: 'all'})
    setIsFilter(false)
    console.log(e.target)
  }

  useEffect(() => {
    console.log("Сработал useEffect2")
    getCharacters()
  }, [url])

  useEffect(() => {
    getButtons()
  }, [pages])

  useEffect(() => {
    getButtons()
    checkDisabled()
  }, [current])

  useEffect(() => {
    getUrlFilter()
  }, [filter])

  return (
    <div>
      <h1>Rick and Morty</h1>
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
        <div>
        <form onSubmit={getValues}>
          <input type="text" placeholder={filter.name} id="name" name="name"/>
          <select name="status">
          <option value="all">all</option>
            <option value="alive">alive</option>
            <option value="dead">dead</option>
            <option value="unknown">unknown</option>
          </select>
          <input type="text" name="species" placeholder="species"></input>
          <input type="text" name="type" placeholder="type"></input>
          <select name="gender">
            <option value="all">all</option>
            <option value="female">female</option>
            <option value="male">male</option>
            <option value="genderless">genderless</option>  
            <option value="unknown">unknown</option>
          </select>
          <button type="submit">Seach</button>
          <button type="button" onClick={handleClear}>Clear</button>
        </form>
        </div>
      {isLoading ? 'Loading...' :
      <div>
        <ul className={styles.list}>
          {characters === undefined ? 'Try again' : characters.map((item) => (
            <li key={item.id} className={styles.item}>
              <h3>Name: {item.name}</h3>
              <img src={item.image} alt={item.name}/>
              <p>Status: {item.status}</p>
              <p>Species: {item.species}</p>
              <p>Type: {item.type}</p>
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
