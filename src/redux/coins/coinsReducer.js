import { GET_COINS } from './coinsType'

const initialState = {
  coins: 100
}

const coinsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_COINS: return {
      ...state,
      coins: action.payload
    }

    default: return state
  }
}

export default coinsReducer
