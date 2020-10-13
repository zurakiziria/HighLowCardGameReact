import { GET_REALCARDS } from './realCardsType'

const initialState = {
  realCards: []
}

const realCardsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_REALCARDS: return {
      ...state,
      realCards: action.payload
    }

    default: return state
  }
}

export default realCardsReducer
