import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import './Game.css';

function PrevCards(props) {

  const [cards, setcards] = useState([])    
  console.log(props.passedCards);
  useEffect(() => {
    let arr = [];
    console.log(props.passedCards);
     if(props.passedCards !== null && props.passedCards.passedCards !== undefined && props.passedCards.passedCards.length > 0){
      props.passedCards.passedCards.map((el)=>{
        let img = "images/"+el+".png" ;
        arr.push(<div className="prev_cards_in"><img src={img} width="200px" /></div>);
      });
     }
     
     setcards(arr)
  }, [props.passedCards]);
  return <div className="prev_cards">{cards}</div>;
}

const mapStateToProps = (state) => {
  return {
    passedCards: state.passedCards,
  };
};
export default connect(mapStateToProps)(PrevCards);
