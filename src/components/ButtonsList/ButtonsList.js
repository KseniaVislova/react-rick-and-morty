import styles from './ButtonsList.module.css'
import Button from '../Button/Button';

const ButtonsList = ({goToPage, buttons, pages}) => {
  return (
    <ul className={styles.list}>
      <li><Button onClick={() => goToPage(1)} value="Start" disabled={false}/></li>
      {buttons.map((item) => (
        <li key={item}><Button onClick={() => goToPage(item)} value={item} disabled={false}/></li>
      ))}
      <li><Button onClick={() => goToPage(pages)} value="End" disabled={false}/></li>
    </ul>
  )
}

export default ButtonsList;