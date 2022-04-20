import { combineReducers } from 'redux'

import { ingredientsReducer } from './slices/ingredients-slice'
import { authorizationReducer } from './slices/authorization-slice'


const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  authorization: authorizationReducer
})

export default rootReducer