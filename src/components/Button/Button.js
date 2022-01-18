const Button = ({onClick, value, disabled}) => {
  return (
    <button onClick={onClick} disabled={disabled}>{value}</button> 
  )
}

export default Button;