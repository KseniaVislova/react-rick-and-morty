const Popup = ({character, closeModal}) => {
  console.log(character)

  return (
    <div>
      <button onClick={closeModal}>x</button>
      <h3>Name: {character.name}</h3>
      <img src={character.image} alt={character.name}/>
      <p>Status: {character.status}</p>
      <p>Species: {character.species}</p>
      <p>Type: {character.type}</p>
    </div> 
  )
}

export default Popup;