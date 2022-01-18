import styles from './ButtonsList.module.css'

const ButtonsList = ({goToPage, buttons, pages}) => {
  return (
    <ul className={styles.list}>
      <li><button onClick={() => goToPage(1)}>Start</button></li>
      {buttons.map((item) => (
        <li key={item}><button onClick={() => goToPage(item)}>{item}</button></li>
      ))}
      <li><button onClick={() => goToPage(pages)}>End</button></li>
    </ul>
  )
}

export default ButtonsList;