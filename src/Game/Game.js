import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import {
  setPassedCards,
  setCoins,
  setRealCards,
  generateCards,
  generateCoins,
  setToLocalStorage,
  clearLocalStorage,
  _arrayShufle
} from "../helpers/cardHelper";
import './Game.css';

const canvasWidth = 900,
  canvasHeight = 650,
  canvasCardWidth = 150,
  canvasCardHeight = 220,
  MIN_LOT = 10,
  cardBackImage = "images/blue_back.png",
  carPositions = {
    backPack: [2, 2],
    currentCard: [400, 400],
    showedCard: [400, 2],
    passedCard: [700, 2],
  };

var TIMEOUT = null;

function Game(props) {
  const canvasRef = useRef(null);
  const coinRef = useRef(null);

  const [buttonHiger, setbuttonHiger] = useState(false);
  const [buttonLower, setbuttonLower] = useState(false);
  const [buttonRestart, setbuttonRestart] = useState(false);

  const [context, setContext] = useState(null);
  const [coinsInput, setcoinsInput] = useState(MIN_LOT);
  const [renderCount, setrenderCount] = useState(0);
  const [messages, setmessages] = useState(0);
  const [messagesText, setmessagesText] = useState(0);
  const [gameOver, setGameOver] = useState(0);

  const generateCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    setContext(ctx);
    //context = canvas.getContext("2d");
    //Our first draw
    ctx.fillStyle = "#ffffff";

    ctx.canvas.width = canvasWidth;
    ctx.canvas.height = canvasHeight;
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
  };

  const rerenderCanvas = () => {
    context.clearRect(0, 0, canvasWidth, canvasHeight);

    context.fillStyle = "#ffffff";
    context.canvas.width = canvasWidth;
    context.canvas.height = canvasHeight;
    context.fillRect(0, 0, canvasWidth, canvasHeight);
  };


  function generateImage(type, realCards) {
    console.log(realCards);
    const image = new Image();
    switch (type) {
      case "backPack":
        image.src = cardBackImage;
        break;
      case "currentCard":
        image.src = "images/" + realCards[0] + ".png";
        break;
      case "showedCard":
        image.src = "images/" + realCards[1] + ".png";
        break;
      case "passedCard":
        image.src = cardBackImage;
        break;
    }
    
    image.onload = () => {
      context.drawImage(
        image,
        carPositions[type][0],
        carPositions[type][1],
        canvasCardWidth,
        canvasCardHeight
      );
    };
    
  };
  

  const calculateResult = (type, cards, realCards, passedCards) => {
   
    if (gameOver) {
      setmessages(1);
      setmessagesText("You are out of money push 'Restart Game' button");
      return false;
    }
    generateImage("showedCard", realCards);
    let coins = props.coins;
    setmessages(1);
    if (type) {
      if (props.hierarchy[realCards[0]] < props.hierarchy[realCards[1]]) {
        coins = parseInt(coins) + parseInt(coinsInput);
        setmessagesText("Congradulation You Won !!!");
        passedCards.push(realCards[0]);
      } else if (props.hierarchy[realCards[0]] > props.hierarchy[realCards[1]]) {
        coins = parseInt(coins) - parseInt(coinsInput);
        setmessagesText("Sorry, You Lost !!!");
        passedCards = [];
      } else {
        setmessagesText("Oops, Cards are same !!!");
        passedCards.push(realCards[0]);
      }
    } else {
      if (props.hierarchy[realCards[0]] > props.hierarchy[realCards[1]]) {
        coins = parseInt(coins) + parseInt(coinsInput);
        setmessagesText("Congradulation You Won !!!");
        passedCards.push(realCards[0]);
      } else if (props.hierarchy[realCards[0]] < props.hierarchy[realCards[1]]) {
        coins = parseInt(coins) - parseInt(coinsInput);
        setmessagesText("Sorry, You Lost !!!");
        passedCards = [];
      } else {
        setmessagesText("Oops, Cards are same !!!");
        passedCards.push(realCards[0]);
      }
    }
    setPassedCards(passedCards);
    let realcards = [];
    if(passedCards.length == 0){
      realcards = _arrayShufle(cards).filter( function( el ) {
        return passedCards.indexOf( el ) < 0;
      } );
    }
    else{
      realcards = cards.filter( function( el ) {
        return passedCards.indexOf( el ) < 0;
      } );
    }
    setRealCards(realcards);
    setCoins(coins);
    setbuttonHiger(true);
    setbuttonLower(true);
    setbuttonRestart(true);
    setToLocalStorage(coins, passedCards);
    TIMEOUT = setTimeout(() => {
      if (!gameOver) {
        rerenderCanvas();

        generateImage("backPack", realcards);
        generateImage("currentCard", realcards);
        if(passedCards.length > 0){
          generateImage("passedCard", realcards);
        }
        setmessages(0);
        setmessagesText("");
        setbuttonHiger(false);
        setbuttonLower(false);
        setbuttonRestart(false);
      }

      //checkCoins();
    }, 2000);
  };

  const restartGame = () => {
    if (TIMEOUT !== null) {
      clearTimeout(TIMEOUT);
    }
    clearLocalStorage();
    context.clearRect(0, 0, canvasWidth, canvasHeight);
    generateCards();
    setrenderCount(0);
    generateCoins();
    generateCanvas();
    setGameOver(0);
    setcoinsInput(MIN_LOT);
    setmessages(0);
    setmessagesText("");
  };

  const renderGame = (realCards, passedCards) => {
      generateImage("backPack", realCards);
      generateImage("currentCard", realCards);
      
      if(passedCards.length > 0){
        generateImage("passedCard", realCards);
      }
  }

  useEffect(() => {
    generateCanvas();
  }, []);


  useEffect(() => {
    if (props.coins !== null && props.coins < MIN_LOT) {
      setmessages(1);
      setmessagesText("You are out of money push 'Restart Game' button");
      setGameOver(1);
    }
  }, [props.coins]);

  useEffect(() => {
   
    if (
      props.cards !== null &&
      props.cards.length > 0 &&
      props.realCards !== null &&
      props.realCards.length > 0 &&
      props.hierarchy !== null &&
      Object.keys(props.hierarchy).length > 0 &&
      props.passedCards !== null &&
      context !== null
    ) {

      renderGame(props.realCards, props.passedCards);
      
      }
   
  }, [props.cards, props.hierarchy, props.passedCards, context]);

  return (
    <div
      className="main_div"
      style={{
        width: canvasWidth + "px",
      }}
    >
      {messages == 1 ? (
        <div
          className="msg"
        >
          {messagesText}
        </div>
      ) : (
        <></>
      )}
      <canvas ref={canvasRef} />
      <div
        className="controllers"
      >
        <div className='controlers_in'>
          <div className="controllers_div">Coins: {props.coins !== null ? props.coins : 0}</div>
          <div className="controllers_div">
            <input
              className="inputForms"
              type="number"
              ref={coinRef}
              min={MIN_LOT}
              max={props.coins}
              value={coinsInput}
              onChange={(e) => {
                if (e.target.value < MIN_LOT || e.target.value > props.coins) {
                  e.target.style.color = "red";
                  setcoinsInput(e.target.value);
                } else {
                  e.target.style.color = "black";
                  setcoinsInput(e.target.value);
                }
              }}
              onBlur={(e) => {
                e.target.style.color = "black";
                if (e.target.value < MIN_LOT) {
                  setcoinsInput(MIN_LOT);
                }
                if (e.target.value > props.coins) {
                  setcoinsInput(props.coins);
                }
              }}
            />
          </div>
        </div>
        <div className='controlers_in'>
          <div className="controllers_div">
            <button
              className="inputForms"
              disabled={buttonHiger}
              onClick={() => {
                calculateResult(1, props.cards, props.realCards, props.passedCards);
              }}
            >
              Higher
            </button>
          </div>
          <div className="controllers_div">
            <button
              className="inputForms"
              disabled={buttonLower}
              onClick={() => {
                calculateResult(0, props.cards, props.realCards, props.passedCards);
              }}
            >
              Lower
            </button>
          </div>
        </div>
        <div className='controlers_in'>
          <div className="controllers_div">
            <button
              className="inputForms"
              disabled={buttonRestart}
              onClick={() => {
                restartGame();
              }}
            >
              Restart Game
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    cards: state.cards.cards,
    hierarchy: state.hierarchy.hierarchy,
    passedCards: state.passedCards.passedCards,
    realCards: state.realCards.realCards,
    coins: state.coins.coins,
  };
};
export default connect(mapStateToProps, null)(Game);
