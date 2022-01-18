import styles from './ButtonsList.module.css'
import Button from '../Button/Button';

const ButtonsList = ({goToPage, buttons, pages, current}) => {
  return (
    <div className={styles.container}>
      <Button onClick={() => goToPage(1)} value="Start" disabled={false}/>
      <ul className={styles.list}>
        {buttons.map((item) => (
          <li key={item}><Button onClick={() => goToPage(item)} value={item} disabled={false} current={current}/></li>
        ))}
      </ul>
      <Button onClick={() => goToPage(pages)} value="End" disabled={false}/>
    </div>
  )
}

export default ButtonsList;