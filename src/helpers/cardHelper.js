import store from "../redux/store";
import { getCards, getHierarchy, getPassedCards, getCoins, getRealCards } from "../redux";

const cardNums = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "J",
  "Q",
  "K",
  "A",
];
const cardColors = ["C", "D", "H", "S"];

function setReduxValue(method, value) {
  store.dispatch(method(value));
}

export function generateCards() {
  const [cards, hierarchy] = _generateCards();
  const [_, st_passedCards] = _getFromLocalstorage();
  let c = _arrayShufle(cards);
  let realcards = c.filter( function( el ) {
    return st_passedCards.indexOf( el ) < 0;
  } );
  store.dispatch(getCards(c));
  store.dispatch(getRealCards(realcards));
  store.dispatch(getHierarchy(hierarchy));
  store.dispatch(getPassedCards(st_passedCards));
}

export function generateCoins() {
  const [st_coins, _] = _getFromLocalstorage();
  store.dispatch(getCoins(st_coins));
}

export function setPassedCards(passedCards) {
  console.log(passedCards);
  store.dispatch(getPassedCards(passedCards));
}

export function setRealCards(realCards){
  store.dispatch(getRealCards(realCards));
}

export function setCoins(coin) {
  store.dispatch(getCoins(coin));
}

export function setToLocalStorage(coins, cards) {
  localStorage.setItem("Coins", coins);
  localStorage.setItem("PassedCards", JSON.stringify(cards));
}

export function clearLocalStorage(){
  localStorage.removeItem("Coins");
  localStorage.removeItem("PassedCards");
}

function _getFromLocalstorage() {
  let st_coins =
    localStorage.getItem("Coins") !== null &&
    localStorage.getItem("Coins") !== undefined
      ? localStorage.getItem("Coins")
      : 100;
  let st_passedCards = [];
      try{
        if(Array.isArray(JSON.parse(localStorage.getItem("PassedCards")))){
          st_passedCards = JSON.parse(localStorage.getItem("PassedCards"));
        }
        else{
          st_passedCards = [];
        }
        
      }
      catch(err){
        console.trace(err);
      }

  return [st_coins, st_passedCards];
}

export function _arrayShufle(array) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;

  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function _generateCards() {
  let cards = [];
  let hierarchy = {};
  let passedCards = [];
  for (const cardNum in cardNums) {
    for (const cardColor of cardColors) {
      cards.push(cardNums[cardNum] + cardColor);
      hierarchy[cardNums[cardNum] + cardColor] = +cardNum;
    }
  }
  return [cards, hierarchy, passedCards];
}
