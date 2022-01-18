import styles from './Button.module.css'
import classnames from "classnames";

const Button = ({onClick, value, disabled, current}) => {
  return (
    <button onClick={onClick} disabled={disabled} className={classnames([styles.button], {[styles.active]: current === value})}>{value}</button> 
  )
}

export default Button;