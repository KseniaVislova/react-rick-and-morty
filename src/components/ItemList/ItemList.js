import styles from './ItemList.module.css'
import Popup from '../Popup/Popup';

const ItemList = ({characters, openModal, isModal, character, closeModal}) => {
  return (
    <ul className={styles.list}>
      {characters === undefined ? 'Try again' : characters.map((item) => (
        <li key={item.id} className={styles.item} >
          <img className={styles.img} src={item.image} alt={item.name}/>
          <div className={styles.wrapper}>
            <h3>{item.name}</h3>
            <button className={styles.button} onClick={openModal} value={item.url}>Learn more</button>
            {isModal && item.name === character.name ? <Popup character={character} closeModal={closeModal} /> : ''}
          </div>
        </li>  
        ))
      }
    </ul>
  )
}

export default ItemList;