import { combineReducers } from 'redux'
import citiesReducer from './citiesReducers'
import userReducer from './userReducer'
import itinerariesReducers from './itinerariesReducers'


const rootReducer = combineReducers({
   cities: citiesReducer,
   user: userReducer,
   itineraries: itinerariesReducers,
})

export default rootReducer