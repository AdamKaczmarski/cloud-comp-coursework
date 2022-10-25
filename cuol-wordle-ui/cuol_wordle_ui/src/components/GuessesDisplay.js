import {useState,useEffect} from 'react';
import { useDispatch, useSelector } from "react-redux";
import Row from 'react-bootstrap/Row'
import Guess from './Guess';

const GuessesDisplay=()=>{
    const guesses = useSelector(state=>state.guesses.guesses);
    const chosenLength = useSelector((state) => state.chosenWord.chosenLength);
    console.log(guesses);
    const CHOSEN_WORD = 'HOUSE';
    //HERE WE ARE GOING TO DISPLAY A LIST OF GUESS CONTAINING LETTERS
    
    return(
        <>
        {CHOSEN_WORD.split('').map((el,idx)=><Guess length={CHOSEN_WORD.length} empty={true} key={idx}/>)}
        </>
    );
}

export default GuessesDisplay;