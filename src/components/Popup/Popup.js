import { useState, useEffect } from 'react';
import styles from './Popup.module.css'

const Popup = ({character, closeModal}) => {
  const [firstEpisode] = useState(character.episode[0])
  const [firstName, setFirstName] = useState('')
  const [firstDate, setFirstDate] = useState('')
  const [lastEpisode] = useState(character.episode[character.episode.length - 1])
  const [lastName, setLastName] = useState('')
  const [lastDate, setLastDate] = useState('')

  const getFirstEpisode = async() => {
    try {
      let res = await fetch(firstEpisode)
      res = await res.json()
      setFirstName(res.name);
      setFirstDate(res.air_date)
    } catch { 
      console.log('Error')
    } 
  }

  const getLastEpisode = async() => {
    try {
      let res = await fetch(lastEpisode)
      res = await res.json()
      setLastName(res.name);
      setLastDate(res.air_date)
    } catch { 
      console.log('Error')
    } 
  }

  useEffect(() => {
    getFirstEpisode();
    getLastEpisode();
  }, [firstEpisode, lastEpisode])


  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <img className={styles.img} src={character.image} alt={character.name}/>
        <div className={styles.inner}>
          <h3 className={styles.title}>{character.name}</h3>
          <p><span>Status:</span> {character.status}</p>
          <p><span>Species: </span>{character.species}</p>
          <p><span>Gender: </span>{character.gender}</p>
          <p><span>Origin: </span>{character.origin.name}</p>
          <p><span>Location: </span>{character.location.name}</p>
          <p><span>First episode: </span>{firstName}, <span>Date</span> {firstDate}</p>
          <p><span>Last episode: </span>{lastName}, <span>Date</span> {lastDate}</p>
          {character.type.length > 0 ? <p><span>Type: </span>{character.type}</p> : ''}
          <button className={styles.button} onClick={closeModal}>x</button>
        </div>
      </div>
    </div> 
  )
}

export default Popup;