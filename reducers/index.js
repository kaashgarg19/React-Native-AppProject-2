import { combineReducers } from 'redux'
import { LOGIN, SIGNUP, UPDATE_EMAIL, UPDATE_PASSWORD } from '../actions/user'

const user = (state = {}, action) => {
	switch (action.type) {
		case LOGIN:
			return action.payload
		case SIGNUP:
			return action.payload
		case UPDATE_EMAIL:
			return { ...state, email: action.payload }
		case UPDATE_PASSWORD:
			return { ...state, password: action.payload }
		default:
			return state
	}
}

const cartItems = (state = [], action) => {
    switch(action.type){
        case 'ADD_TO_CART':
			return [...state, action.payload]
        case 'REMOVE_FROM_CART':
			return state.filter(cartItem => cartItem.id !== action.payload.id)
		case 'REMOVE_ALL':
			return state.filter(cartItem => cartItem)
    }	
    return state
}

const rootReducer = combineReducers({
	user,
	cartItems
})

export default rootReducer