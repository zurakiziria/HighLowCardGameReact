import { GET_CARDS } from './cardsType'

export const getCards = (data = null) => {
  return {
    type: GET_CARDS,
    payload: data
  }
}
