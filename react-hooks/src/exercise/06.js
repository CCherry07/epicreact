// useEffect: HTTP requests
// http://localhost:3000/isolated/exercise/06.js

import * as React from 'react'
import { PokemonForm, fetchPokemon, PokemonInfoFallback, PokemonDataView } from '../pokemon'


function useAsync(promise, initialConfig) {

}

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      error: null
    }
  }

  static getDerivedStateFromError(error) {
    return { error }
  }

  render() {
    const { error } = this.state
    console.log("ErrorBoundary", this.state.error);
    if (error) {
      return (<div role="alert">
        There was an error: <pre style={{ whiteSpace: 'normal' }}>{error.message}</pre>
      </div>)
    }
    return this.props.children
  }
}


function PokemonInfo({ pokemonName }) {
  const [status, setStatus] = React.useState("idle")
  const [pokemon, setPokemon] = React.useState(null)
  const [error, setError] = React.useState("")
  React.useEffect(() => {
    if (!pokemonName) return
    setPokemon(null)
    setStatus("pending")
    fetchPokemon(pokemonName).then((res) => {
      setPokemon(res)
      setStatus("resolved")
      error.message && setError("")
    }, (err) => {
 
      setError(err)

      setStatus("rejected")
    })
  }, [pokemonName]);
  if (status === "rejected") {
    throw error
  }
  return (
    <div>
      {status === "idle" && "Submit a pokemon"}
      {status === "pending" && <PokemonInfoFallback name={pokemonName} />}
      {status === "resolved" && <PokemonDataView pokemon={pokemon} />}
    </div>
  )
}

function App() {
  const [pokemonName, setPokemonName] = React.useState('')

  function handleSubmit(newPokemonName) {
    setPokemonName(newPokemonName)
  }

  return (
    <div className="pokemon-info-app">
      <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
      <hr />
      <div className="pokemon-info">
        <ErrorBoundary>
          <PokemonInfo pokemonName={pokemonName} />
        </ErrorBoundary>
      </div>
    </div>
  )
}

export default App
