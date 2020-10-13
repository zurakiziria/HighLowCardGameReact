import { combineReducers } from "redux";
import cardsReducer from "./cards/cardsReducer";
import hierarchyReducer from "./hierarchy/hierarchyReducer";
import passedCardsReducer from "./passedCards/passedCardsReducer";
import coinsReducer from "./coins/coinsReducer";
import realCardsReducer from "./realCards/realCardsReducer";
const rootReducer = combineReducers({
  cards: cardsReducer,
  hierarchy: hierarchyReducer,
  passedCards: passedCardsReducer,
  coins: coinsReducer,
  realCards: realCardsReducer
});

export default rootReducer;
