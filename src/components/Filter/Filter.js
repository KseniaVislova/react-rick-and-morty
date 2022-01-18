import { useState, useEffect } from 'react';
import styles from './Filter.module.css'

const Filter = ({getValues, handleClear}) => {
  const [isOpen, setOpen] = useState(false)

  const openFilter = () => {
    setOpen(true)
  }

  const closeFilter = () => {
    setOpen(false)
  }

  useEffect(() => {
  }, [isOpen])

  return (
    <div>
      {isOpen ? 
      <form className={styles.form} onSubmit={getValues}>
        <input type="text" placeholder="name" id="name" name="name"/>
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
        <div>
          <button className={styles.button} type="submit">Seach</button>
          <button className={styles.button} type="button" onClick={handleClear}>Clear</button>
          <button className={styles.button} onClick={closeFilter}>x</button> 
        </div>
      </form> :
      <div className={styles.open}>Filter <button className={styles.button} onClick={openFilter}>&#709;</button>
      </div>
    }
    </div>
  )
}

export default Filter;