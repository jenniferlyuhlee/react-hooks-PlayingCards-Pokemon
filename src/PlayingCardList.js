import React, { useState } from "react";
import {v1 as uuid} from "uuid";
import axios from "axios";
import PlayingCard from "./PlayingCard";
import "./PlayingCardList.css";
import { useAxios } from "./hooks";

/* Renders a list of playing cards.
 * Can also add a new card at random. */
function CardTable() {
  const [cards, addCard, removeCards] = useAxios("https://deckofcardsapi.com/api/deck/new/draw/");
  // const [cards, setCards] = useState([])
  // const addCard = async () => {
  //   const response = await axios.get(
  //     "https://deckofcardsapi.com/api/deck/new/draw/"
  //   );
  //   setCards(cards => [...cards, { ...response.data, id: uuid() }]);
  // };
  
  return (
    <div className="PlayingCardList">
      <h3>Pick a card, any card!</h3>
      <div>
        <button onClick={() => addCard("")}>Add a playing card!</button>
        <button onClick = {removeCards} className="remove-cards">Clear cards</button>
      </div>
      <div className="PlayingCardList-card-area">
        {cards.map(cardData => (
          <PlayingCard key={cardData.id} front={cardData.cards[0].image} />
        ))}
      </div>
    </div>
  );
}

CardTable.defaultProps = {};

export default CardTable;
