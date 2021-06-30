import {
  POKEMON_REQUEST,
  POKEMON_SUCCESS,
  POKEMON_DETAIL_SUCCESS,
  POKEMON_FAILED,
} from '../actions/Constant'

const initialState = {
  isFetching: false,
  data: [],
  detail: {},
  totalData: 0,
  errorMessage: null,
}

const pokemon = (state = initialState, action = {}) => {
  switch (action.type) {
    case POKEMON_REQUEST:
      return {
        ...state,
        isFetching: true,
      }
    case POKEMON_SUCCESS:
      return {
        ...state,
        ...action.data,
        isFetching: false,
        errorMessage: null,
      }
    case POKEMON_DETAIL_SUCCESS:
      return {
        ...state,
        detail: action.detail,
        isFetching: false,
        errorMessage: null,
      }
    case POKEMON_FAILED:
      return {
        ...state,
        isFetching: false,
        data: [],
        errorMessage: action.errorMessage,
      }
    default:
      return state
  }
}

export default pokemon