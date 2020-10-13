import { GET_PASSEDCARDS } from './passedCardsType'

const initialState = {
  passedCards: []
}

const passedCardsReducer = (state = initialState, action) => {
  console.log(action);
  switch (action.type) {
    
    case GET_PASSEDCARDS: return {
      ...state,
      passedCards: action.payload
    }

    default: return state
  }
}

export default passedCardsReducer
