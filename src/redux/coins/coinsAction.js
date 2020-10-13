import { GET_COINS } from './coinsType'

export const getCoins = (data = null) => {
  return {
    type: GET_COINS,
    payload: data
  }
}
