import { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setGuesses } from "../store/guessesReducer";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
const dummyResponse = {
  A: { isInTheWord: false, isCorrectPoisition: false, index: 1 },
  I: { isInTheWord: true, isCorrectPoisition: false, index: 2 },
  H: { isInTheWord: false, isCorrectPoisition: false, index: 4 },
  T: { isInTheWord: true, isCorrectPoisition: true, index: 3 },
  F: {
    isInTheWord: true,
    isCorrectPoisition: false,
    index: 0,
  },
};
const WordInput = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const [isWin, setIsWin] = useState(false);
  const chosenLength = useSelector((state) => state.chosenWord.chosenLength);
  const guessesDoneLength = useSelector(
    (state) => state.guesses.guessesDone.length
  );
  const guessHandler = async (ev) => {
    if (
      (ev.charCode === 13 || ev.code === "Enter") &&
      ev.target.value.length === chosenLength
    ) {
      if (guessesDoneLength < chosenLength) {
        //HERE WE CHECK WITH THE SERVER WHETHER THE GUESS IS CORRECT
        // WE SAVE THE RESPONSE FROM THE SERVER IN THE REDUX STORE
        const userGuess = ev.target.value.toUpperCase();
        try {
          const response = await axios({
            method: "POST",
            url: "http://localhost:8000/cuol_wordle/check_chosen",
            data: { chosen_word: userGuess },
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          if (response.data.decision !== null) {
            dispatch(setGuesses(response.data.word));
          }

          if (response.data.decision) {
            document.cookie = `cuolWordleWin=${new Date().getTime()}`
            setIsWin(true);

          }
          ev.target.value = "";
        } catch (err) {
          console.log(err);
        }
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
        ) : (
          <p>CONGRATS!!</p>
        )}
      </Col>
    </Row>
  );
};

export default WordInput;
