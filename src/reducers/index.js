import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'

import pokemon from './Pokemon'

const rootReducer = combineReducers({
  pokemon,
  form: formReducer,
})

export default rootReducer
