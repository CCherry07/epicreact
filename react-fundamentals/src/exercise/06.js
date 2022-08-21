import * as React from 'react'

function UsernameForm({onSubmitUsername}) {
  const [ error , setError ] = React.useState(null)
  const usernameRef = React.useRef(null)
  const handleSubmit = (event)=>{
    event.preventDefault()
    // const value = event.target.elements.usernameInput.value
    const value = usernameRef.current.value
    onSubmitUsername(value)
  }
  const handleChange = (event)=>{
    const {value} = event.target
    const isTolowerCase = value === value.toLowerCase()
    setError(()=> !isTolowerCase && "The Input Content Is All Lowercase !")
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor='usernameInput'>Username:</label>
        <input ref={usernameRef} id='usernameInput' name='username' type="text" onChange={handleChange} />
        {error && <div style={{color:"red"}}>{error}</div>}
        </div>
      <button type="submit">Submit</button>
    </form>
  )
}

function App() {
  const onSubmitUsername = username => alert(`You entered: ${username}`)
  return <UsernameForm onSubmitUsername={onSubmitUsername} />
}

export default App
