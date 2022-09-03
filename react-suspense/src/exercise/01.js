// Simple Data-fetching
// http://localhost:3000/isolated/exercise/01.js

import * as React from 'react'
import { PokemonDataView, fetchPokemon, PokemonErrorBoundary } from '../pokemon'

function createResource(promise) {
  let status = "pending"
  let data = promise.then((res) => {
    data = res
    status = "resolved"
  }, (err) => {
    data = err
    status = "rejected"
  })
  return {
    read() {
      if (status === "pending") throw data
      if (status === "rejected") throw data
      if (status === "resolved") return data
    }
  }
}

const pokemonResource = createResource(fetchPokemon("pikachu"))

function PokemonInfo() {
  const pokemon = pokemonResource.read()
  return (
    <div>
      <div className="pokemon-info__img-wrapper">
        <img src={pokemon?.image} alt={pokemon?.name} />
      </div>
      <PokemonDataView pokemon={pokemon} />
    </div>
  )
}

function App() {
  return (
    <div className="pokemon-info-app">
      <div className="pokemon-info">
        <PokemonErrorBoundary>
          <React.Suspense fallback={<div>loading...</div>}>
            <PokemonInfo />
          </React.Suspense>
        </PokemonErrorBoundary>
      </div>
    </div>
  )
}

export default App
