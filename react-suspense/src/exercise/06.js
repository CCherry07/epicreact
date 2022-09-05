// Suspense with a custom hook
// http://localhost:3000/isolated/exercise/06.js

import * as React from 'react'
import {
  fetchPokemon,
  getImageUrlForPokemon,
  PokemonInfoFallback,
  PokemonForm,
  PokemonDataView,
  PokemonErrorBoundary,
} from '../pokemon'
import { createResource, preloadImage } from '../utils'

function PokemonInfo({ pokemonResource }) {
  const pokemon = pokemonResource.data.read()
  return (
    <div>
      <div className="pokemon-info__img-wrapper">
        <img src={pokemonResource.image.read()} alt={pokemon.name} />
      </div>
      <PokemonDataView pokemon={pokemon} />
    </div>
  )
}

const SUSPENSE_CONFIG = {
  timeoutMs: 4000,
  busyDelayMs: 300,
  busyMinDurationMs: 700,
}


function usePokemonResource({ transitionConfig, initialValue = "" }) {
  const [pokemonName, setPokemonName] = React.useState(initialValue)
  const [startTransition, isPending] = React.useTransition(transitionConfig)
  const [pokemonResource, setPokemonResource] = React.useState(null)
  const pokemonResourceCache = React.useRef({})

  const createPokemonResource = React.useCallback((pokemonName) => {
    const data = createResource(fetchPokemon(pokemonName))
    const image = createResource(preloadImage(getImageUrlForPokemon(pokemonName)))
    return { data, image }
  }, [])
  const getPokemonResource = React.useCallback((name) => {
    const lowerName = name.toLowerCase()
    let resource = pokemonResourceCache.current[lowerName]
    if (!resource) {
      resource = createPokemonResource(lowerName)
      pokemonResourceCache.current[lowerName] = resource
    }
    return resource
  }, [createPokemonResource])

  React.useEffect(() => {
    if (!pokemonName) {
      setPokemonResource(null)
      return
    }
    startTransition(() => {
      setPokemonResource(getPokemonResource(pokemonName))
    })
  }, [pokemonName, startTransition, getPokemonResource])

  return {
    pokemonName,
    setPokemonName,
    pokemonResource,
    setPokemonResource,
    isPending
  }
}

function App() {
  const { pokemonName, setPokemonName,
    pokemonResource, isPending } = usePokemonResource({ initialValue: "", transitionConfig: SUSPENSE_CONFIG })
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
      <div className={`pokemon-info ${isPending ? 'pokemon-loading' : ''}`}>
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
