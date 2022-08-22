// useEffect: HTTP requests
// http://localhost:3000/isolated/exercise/06.js

import * as React from 'react'
import { PokemonForm, fetchPokemon, PokemonInfoFallback, PokemonDataView } from '../pokemon'

function PokemonInfo({ pokemonName }) {
  const [pokemon, setPokemon] = React.useState(null)
  const [error, setError] = React.useState("")
  React.useEffect(() => {
    if (!pokemonName) return
    setPokemon(null)
    fetchPokemon(pokemonName).then((res)=>{
      setPokemon(res)
      error.message && setError("")
    }).catch(setError)
  }, [pokemonName]);
  return (
    <>
      {error.message && <div role="alert">
        There was an error: <pre style={{ whiteSpace: 'normal' }}>{error.message}</pre>
      </div>}
      <div>
      { !pokemonName && "Submit a pokemon" }
      { pokemonName && !pokemon && <PokemonInfoFallback name={pokemonName} />}
      { pokemon && <PokemonDataView pokemon={pokemon} /> }
      </div>
    </>
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
        <PokemonInfo pokemonName={pokemonName} />
      </div>
    </div>
  )
}

export default App
