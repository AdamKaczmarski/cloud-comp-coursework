import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setGuesses } from "../store/guessesReducer";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
const dummyResponse = {
  "A":{isInTheWord:false,
    isCorrectPoisition:false,
    index:1
  },"I":{isInTheWord:true,
    isCorrectPoisition:false,
    index:2
  },"H":{isInTheWord:false,
    isCorrectPoisition:false,
    index:4
  },"T":{isInTheWord:true,
    isCorrectPoisition:true,
    index:3
  },"F":{
    isInTheWord:true,
    isCorrectPoisition:false,
    index:0
  }
}
const WordInput = () => {
  const dispatch = useDispatch();
  const [isWin, setIsWin] = useState(false);
  const chosenLength = useSelector((state) => state.chosenWord.chosenLength);
  const guessesDoneLength = useSelector(
    (state) => state.guesses.guessesDone.length
  );
    const CHOSENWORDTMP="HOUSE"
  const guessHandler = (ev) => {
    if (
      (ev.charCode === 13 || ev.code === "Enter") &&
      ev.target.value.length === chosenLength
    ) {
      if (guessesDoneLength < chosenLength) {
        //HERE WE CHECK WITH THE SERVER WHETHER THE GUESS IS CORRECT
        // WE SAVE THE RESPONSE FROM THE SERVER IN THE REDUX STORE
        const userGuess = ev.target.value.toUpperCase();
        /*
          API CALL TO THE CHECK IF CHOSEN
        */
        dispatch(setGuesses(dummyResponse));
        if (userGuess===CHOSENWORDTMP) {
          console.log("WIN")
          setIsWin(true);
        }
        ev.target.value = "";
      } else {
        console.log("LOST");
      }
    }
  };
  return (
    <Row className="justify-content-md-center">
      <Col md="auto">
        {guessesDoneLength < chosenLength && !isWin ? (
          <Form onSubmit={(ev) => ev.preventDefault()}>
            <Form.Group className="mb-3" controlId="chooseWord">
              <Form.Label className="text-muted">
                Press enter to confirm your guess
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Guess the word"
                onKeyPress={guessHandler}
                disabled={!(guessesDoneLength < chosenLength) && !isWin}
              />
            </Form.Group>
          </Form>
        ) : null}
      </Col>
    </Row>
  );
};

export default WordInput;
