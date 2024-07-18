import React, {useState} from 'react';
import axios from 'axios';
import {v1 as uuid} from "uuid";

/**
 *  Custom hook to toggle card-flipping
 *  Returns: state of flip, and function to toggle state
 */
function useFlip(initialFlipState = true) {
    const [isFlipped, setIsFlipped] = useState(initialFlipState);
    const flipCard = () => {
        setIsFlipped(isFlipped => !isFlipped)
    }
    return [isFlipped, flipCard]
}

/**
 * Custom hook that takes url arg to make axios get requests to api
 * Returns: array holding card data, 
 *          function to add card(takes parameter of url endpoint), 
 *          function to remove card
 */
function useAxios(baseUrl) {
    const [cards, setCards] = useState([]);
    const addCardData = async (endpointUrl) => {
        const fullUrl = endpointUrl === "" ? baseUrl : `${baseUrl}${endpointUrl}` 
        const resp = await axios.get(fullUrl);
        setCards(cards => [...cards, {...resp.data, id: uuid()}]);
    };
    
    const removeCardData = () => setCards([])

    return [cards, addCardData, removeCardData]
}

export {useFlip, useAxios};