// import 

export default function SearchForm({ params }) {
  const { fetchParams, setFetchParams } = params

  function handleInputChange(event) {
    event.preventDefault()

    const { name, value } = event.target
    setFetchParams(prev => ({
      ...prev,
      [name]: value
    }))
  }

  return (
    <>
      <div className="formGroup">
        <label htmlFor="search">Search</label>
        <input type="text" id="search" name="search" onChange={handleInputChange} />
      </div>
      <div className="formGroup">
        <label htmlFor="mediaId">mediaId</label>
        <input type="text" id="mediaId" name="mediaId" onChange={handleInputChange} />
      </div>
      <input type="submit" value="Submit" />
    </>
  )
}