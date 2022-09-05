// Suspense Image
// http://localhost:3000/isolated/exercise/05.js

import * as React from 'react'
import {
  fetchPokemon,
  getImageUrlForPokemon,
  PokemonInfoFallback,
  PokemonForm,
  PokemonErrorBoundary,
} from '../pokemon'
import { createResource, preloadImage } from '../utils'
const PokemonInfo = React.lazy(() =>
  import('../lazy/pokemon-info-render-as-you-fetch'),
)
// const imgSrcResourceCache = {}

// function Img({ src, alt, ...props }) {
//   let imgSrcResource = imgSrcResourceCache[src]
//   if (!imgSrcResource) {
//     imgSrcResource = createResource(preloadImage(src))
//     imgSrcResourceCache[src] = imgSrcResource
//   }
//   return <img src={imgSrcResource.read()} alt={alt} {...props} />
// }

// function PokemonInfo({ pokemonResource }) {
//   const pokemon = pokemonResource.data.read()
//   return (
//     <div>
//       <div className="pokemon-info__img-wrapper">
//         <img src={pokemonResource.image.read()} alt={pokemon.name} />
//       </div>
//       <PokemonDataView pokemon={pokemon} />
//     </div>
//   )
// }

const SUSPENSE_CONFIG = {
  timeoutMs: 4000,
  busyDelayMs: 300,
  busyMinDurationMs: 700,
}

const pokemonResourceCache = {}

function getPokemonResource(name) {
  const lowerName = name.toLowerCase()
  let resource = pokemonResourceCache[lowerName]
  if (!resource) {
    resource = createPokemonResource(lowerName)
    pokemonResourceCache[lowerName] = resource
  }
  return resource
}

function createPokemonResource(pokemonName) {
  const data = createResource(fetchPokemon(pokemonName))
  const image = createResource(preloadImage(getImageUrlForPokemon(pokemonName)))
  return { data, image }
}

function App() {
  const [pokemonName, setPokemonName] = React.useState('')
  const [startTransition, isPending] = React.useTransition(SUSPENSE_CONFIG)
  const [pokemonResource, setPokemonResource] = React.useState(null)

  React.useEffect(() => {
    if (!pokemonName) {
      setPokemonResource(null)
      return
    }
    startTransition(() => {
      setPokemonResource(getPokemonResource(pokemonName))
    })
  }, [pokemonName, startTransition])

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
