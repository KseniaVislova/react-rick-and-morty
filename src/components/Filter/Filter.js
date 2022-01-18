const Filter = ({getValues, handleClear}) => {
  
  return (
    <form onSubmit={getValues}>
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
      <button type="submit">Seach</button>
      <button type="button" onClick={handleClear}>Clear</button>
    </form>
  )
}

export default Filter;