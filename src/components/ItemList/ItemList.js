import styles from './ItemList.module.css'

const ItemList = ({characters, openModal}) => {
  return (
    <ul className={styles.list}>
      {characters === undefined ? 'Try again' : characters.map((item) => (
        <li key={item.id} className={styles.item} >
          <h3>Name: {item.name}</h3>
          <img src={item.image} alt={item.name}/>
          <button onClick={openModal} value={item.url}>Learn more</button>
        </li>  
        ))
      }
    </ul>
  )
}

export default ItemList;