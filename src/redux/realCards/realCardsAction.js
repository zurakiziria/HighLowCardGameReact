import { GET_REALCARDS } from './realCardsType'

export const getRealCards = (data = null) => {
  return {
    type: GET_REALCARDS,
    payload: data
  }
}
