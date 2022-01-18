import styles from './Button.module.css'

const Button = ({onClick, value, disabled}) => {
  return (
    <button className={styles.button} onClick={onClick} disabled={disabled}>{value}</button> 
  )
}

export default Button;