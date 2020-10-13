import { GET_CARDS } from './cardsType'

const initialState = {
  cards: []
}

const cardsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CARDS: return {
      ...state,
      cards: action.payload
    }

    default: return state
  }
}

export default cardsReducer
