// useTransition for improved loading states
// http://localhost:3000/isolated/exercise/03.js

import * as React from 'react'
import {
  fetchPokemon,
  PokemonInfoFallback,
  PokemonForm,
  PokemonDataView,
  PokemonErrorBoundary,
} from '../pokemon'
import { createResource } from '../utils'

function PokemonInfo({ pokemonResource }) {
  const pokemon = pokemonResource.read()
  return (
    <div>
      <div className="pokemon-info__img-wrapper">
        <img src={pokemon.image} alt={pokemon.name} />
      </div>
      <PokemonDataView pokemon={pokemon} />
    </div>
  )
}

const SUSPENSE_CONFIG = { timeoutMs: 4000 }
// 🐨 create a SUSPENSE_CONFIG variable right here and configure timeoutMs to
// whatever feels right to you, then try it out and tweak it until you're happy
// with the experience.

function createPokemonResource(pokemonName) {
  // 🦉 once you've finished the exercise, play around with the delay...
  // the second parameter to fetchPokemon is a delay so you can play around
  // with different timings
  let delay = 1500
  // try a few of these fetch times:
  // shows busy indicator
  // delay = 450

  // shows busy indicator, then suspense fallback
  // delay = 5000

  // shows busy indicator for a split second
  // 💯 this is what the extra credit improves
  delay = 200
  return createResource(fetchPokemon(pokemonName, delay))
}

function App() {
  const [pokemonName, setPokemonName] = React.useState('')
  // 🐨 add a useTransition hook here
  const [setTransition, ispending] = React.useTransition(SUSPENSE_CONFIG)
  const [pokemonResource, setPokemonResource] = React.useState(null)

  React.useEffect(() => {
    if (!pokemonName) {
      setPokemonResource(null)
      return
    }
    setTransition(() => setPokemonResource(createPokemonResource(pokemonName)))
  }, [pokemonName, setTransition])

  function handleSubmit(newPokemonName) {
    setPokemonName(newPokemonName)
  }

  function handleReset() {
    setPokemonName('')
  }

  return (
    <div className="pokemon-info-app">
      <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
      <hr />
      <div className={(`pokemon-info ${ispending ? 'pokemon-loading' : ""}`)}>
        {pokemonResource ? (
          <PokemonErrorBoundary
            onReset={handleReset}
            resetKeys={[pokemonResource]}
          >
            <React.Suspense
              fallback={<PokemonInfoFallback name={pokemonName} />}
            >
              <PokemonInfo pokemonResource={pokemonResource} />
            </React.Suspense>
          </PokemonErrorBoundary>
        ) : (
          'Submit a pokemon'
        )}
      </div>
    </div>
  )
}

export default App
