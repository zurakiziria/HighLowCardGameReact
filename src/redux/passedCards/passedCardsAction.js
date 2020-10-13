import { GET_PASSEDCARDS } from './passedCardsType'

export const getPassedCards = (data = null) => {
  return {
    type: GET_PASSEDCARDS,
    payload: data
  }
}
