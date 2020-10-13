import React, { useEffect } from "react";
import { generateCards, generateCoins } from "../helpers/cardHelper";
import Game from "./Game";
import PrevCards from "./PrevCards";

function Start(props) {
  useEffect(() => {
     generateCards();
     generateCoins();
  }, []);
  return <div><Game /><div><PrevCards /></div></div>;
}

export default Start;
