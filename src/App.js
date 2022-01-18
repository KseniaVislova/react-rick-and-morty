import { render } from "@testing-library/react";
import React, { useState, useReducer, useEffect, useRef, useCallback} from "react";
import Popup from "./components/Popup/Popup";
import Filter from "./components/Filter/Filter";
import ItemList from "./components/ItemList/ItemList";
import ButtonsList from "./components/ButtonsList/ButtonsList";
import Button from "./components/Button/Button";
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
  const [isModal, setModal] = useState(false)
  const [urlForModal, setUrlForModal] = useState('')
  const [character, setCharacter] = useState({})

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
      if (typeof (res.info.next.split('=')[1]) === 'number') {
        setCurrent(res.info.next.split('=')[1] - 1)
      }  else {
        setCurrent(res.info.next.split('=')[1].split('&')[0] - 1)
      }
    } catch { 
      console.log('Error')
    } 
  }

  const getButtons = () => {
    let array = [current - 2, current - 1, current, current + 1, current + 2];
    let result = [];
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
      array.forEach(item => {
        if(cheakPage(item)) result.push(item)
      })
      setButtons(result)
      setPrev(true)
    }
  }

  const goToPage = (number) => {
    if (filter.name === '' && filter.status === 'all'&& filter.species === ''&& filter.type === ''&& filter.gender === 'all') {
      setUrl("https://rickandmortyapi.com/api/character" + "?page=" + number)
    } else {
      if (url.includes('page')) {
        let res = url.split('?page=')[1].split('&')
        let newUrl = "https://rickandmortyapi.com/api/character/" + "?page=" + number;
        for (let i = 1; i < res.length; i++) {
          newUrl = newUrl + "&" + res[i]
        }
        setUrl(newUrl)
      } else {
        let res = url.split('?')
        setUrl(res[0] + "?page=" + number + '&' + res[1])
      }
    }

    setCurrent(number)
  }

  const getNextPage = () => {
    setUrl(result.info.next)
    setCurrent(current + 1)
  }

  const getPrevPage = () => {
    setUrl(result.info.prev)
    setCurrent(current - 1)
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
    let newUrl = "https://rickandmortyapi.com/api/character/?"
    let i = 0;
    for (let key in filter) {
      if (filter[key] !== '' && filter[key] !== 'all') {
        if (i === 0) {
          newUrl = newUrl + key + "=" + filter[key]
        } else {
          newUrl = newUrl + "&" + key + "=" + filter[key]
        }
      }
      i += 1;
    }
    setUrl(newUrl)
  }

  const closeModal = () => {
    setModal(false)
    setCharacter({})
  }

  const getValues = async(e) => {
    closeModal()
    const res = {name: e.target[0].value, status: e.target[1].value, species: e.target[2].value, type: e.target[3].value, gender: e.target[4].value}
    setFilter(res)
    e.preventDefault()
  }

  const handleClear = (e) => {
    setUrl("https://rickandmortyapi.com/api/character")
    setFilter({name: '', status: 'all', species: '', type: '', gender: 'all'})
  }

  const openModal = (e) => {
    console.log(e.target)
    console.log(e.target.value)
    setUrlForModal(e.target.value)
    setModal(true)
  }

  const getInfo = async() => {
    try {
      let res = await fetch(urlForModal)
      res = await res.json()
      setCharacter(res)
      console.log(res)
    } catch { 
      console.log('Error')
    } 
  }

  useEffect(() => {
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

  useEffect(() => {
    getInfo()
  }, [urlForModal])

  return (
    <div className={styles.container}>
      <h1>Rick and Morty</h1>
      <div><span>All characters:</span> {count}</div>
      <div className={styles.buttons}>
        {isPrev ? <Button onClick={getPrevPage} value="Prev page" disabled={false} className={styles.order1}/> : <Button onClick={getPrevPage} value="Prev page" disabled={true} className={styles.order1}/> }
        <ButtonsList className={styles.order3} goToPage={goToPage} buttons={buttons} pages={pages} current={current}/>
        {isNext ? <Button onClick={getNextPage} value="Next page" disabled={false} className={styles.order2}/> : <Button onClick={getNextPage} value="Next page" disabled={true} className={styles.order2}/>}
      </div>
      <Filter getValues={getValues} handleClear={handleClear} />
      {isLoading ? 'Loading...' :
      <div>
        <ItemList characters={characters} character={character} openModal={openModal} closeModal={closeModal} isModal={isModal}/>
      </div>
      }
    </div>
  );
}

export default App;
