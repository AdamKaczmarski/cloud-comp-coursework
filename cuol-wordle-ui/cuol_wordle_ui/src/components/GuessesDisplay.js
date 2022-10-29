import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Guess from "./Guess";
const GuessesDisplay = () => {
  const chosenLength = useSelector((state) => state.chosenWord.chosenLength);
  const [displayGuesses, setDisplayGuesses] = useState([]);
  //HERE WE ARE GOING TO DISPLAY A LIST OF GUESS CONTAINING LETTERS
  useEffect(() => {
    const tmp = [];
    for (let i = 0; i < chosenLength; ++i) {
      tmp.push(<Guess length={chosenLength} displayIdx={i} key={i} />);
    }
    setDisplayGuesses(tmp);
  }, [chosenLength]);

  return <>{displayGuesses}</>;
};

export default GuessesDisplay;
