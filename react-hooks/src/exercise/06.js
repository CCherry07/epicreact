// useEffect: HTTP requests
// http://localhost:3000/isolated/exercise/06.js

import * as React from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { PokemonForm, fetchPokemon, PokemonInfoFallback, PokemonDataView } from '../pokemon'


function useAsync(promise, initialConfig) {

}

// class ErrorBoundary extends React.Component {
//   state = { error : null}

//   static getDerivedStateFromError(error) {
//     return { error }
//   }

//   render() {
//     const { error } = this.state
//     if (error) {
//       return <this.props.FallbackErrorComponet error = { error }></this.props.FallbackErrorComponet>
//     }
//     return this.props.children
//   }
// }


function FallbackErrorComponet({ error , resetErrorBoundary}) {
  return (<div role="alert">
    There was an error: <pre style={{ whiteSpace: 'normal' }}>{error.message}</pre>
    <br></br>
    <button onClick={resetErrorBoundary}>Try Again</button>
  </div>)
}

function PokemonInfo({ pokemonName }) {
  const [state, setState] = React.useState({
    status:"idle",
    pokemon: null,
    error: null
  })
  // const [status, setStatus] = React.useState("idle")
  // const [pokemon, setPokemon] = React.useState(null)
  // const [error, setError] = React.useState("")
  const { status, pokemon, error } = state
  React.useEffect(() => {
    if (!pokemonName) return
    setState((state) => ({ ...state, pokemon: null, status: "pending" }))
    fetchPokemon(pokemonName).then((res) => {
      setState((state) => ({ ...state, pokemon: res, status: "resolved" }))
      error.message && setState((state) => ({ ...state, error: null }))
    }, (err) => {
      setState((state) => ({ ...state, status: "rejected", error: err }))
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

  function handleReset() {
    setPokemonName("")
  }

  return (
    <div className="pokemon-info-app">
      <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
      <hr />
      <div className="pokemon-info">
        <ErrorBoundary resetKeys={[pokemonName]} onReset={handleReset} fallbackRender={FallbackErrorComponet}>
          <PokemonInfo pokemonName={pokemonName} />
        </ErrorBoundary>
      </div>
    </div>
  )
}

export default App
