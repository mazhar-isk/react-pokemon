import axios from './Config';
import { first, identity, last, pickBy } from 'lodash';
import qs from 'query-string';
import {
  POKEMON_REQUEST,
  POKEMON_SUCCESS,
  POKEMON_DETAIL_SUCCESS,
  POKEMON_FAILED,
} from './Constant';

export const pokemonRequest = () => (
  {
    type: POKEMON_REQUEST,
  }
)
export const pokemonSuccess = (params) => (
  {
    type: POKEMON_SUCCESS,
    data: params,
  }
)
export const pokemonDetailSuccess = (detail) => (
  {
    type: POKEMON_DETAIL_SUCCESS,
    detail,
  }
)
export const pokemonFailed = (errorMessage) => (
  {
    type: POKEMON_FAILED,
    errorMessage,
  }
)

export const getPokemon = (ID, payload) => {
  return (dispatch) => {
    dispatch(pokemonRequest())
    payload = qs.stringify(pickBy(payload, identity))
    const url = ID ? `/pokemon/${ID}` : `/pokemon?${payload || ''}`
    
    return new Promise((resolve, reject) => {
      axios.get(url).then(({ data }) => {
        if (ID) {
          dispatch(pokemonDetailSuccess(data))
        } else {
          const arr = (data.results || []).map(item => {
            const { name, url } = item
            const id = first(last(url.split('pokemon/')).split('/'))
            const image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/${id}.png`
            return {
              key: id.toString(),
              name,
              image,
            }
          })
          dispatch(pokemonSuccess({ data: arr, totalData: data.count }))
        }
        resolve(data)
      }).catch((err) => {
        dispatch(pokemonFailed(err.message))
        reject(err.message)
      })
    })
    
  }
}