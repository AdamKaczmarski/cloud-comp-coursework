import { useDispatch, useSelector } from "react-redux";
import { setGuesses } from "../store/guessesReducer";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

const WordInput = () => {
  const dispatch = useDispatch();
  const chosenLength = useSelector((state) => state.chosenWord.chosenLength);
  const guessesDoneLength = useSelector(
    (state) => state.guesses.guessesDone.length
  );

  const guessHandler = (ev) => {
    if (
      (ev.charCode === 13 || ev.code === "Enter") &&
      ev.target.value.length === chosenLength
    ) {
      if (guessesDoneLength < chosenLength) {
        dispatch(setGuesses(ev.target.value.toUpperCase()));
        ev.target.value = "";
      } else {
        console.log("LOST");
      }
    }
  };
  return (
    <Row className="justify-content-md-center">
      <Col md="auto">
        {guessesDoneLength < chosenLength ? (
          <Form onSubmit={(ev) => ev.preventDefault()}>
            <Form.Group className="mb-3" controlId="chooseWord">
              <Form.Label className="text-muted">
                Press enter to confirm your guess
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Guess the word"
                onKeyPress={guessHandler}
                disabled={!(guessesDoneLength < chosenLength)}
              />
            </Form.Group>
          </Form>
        ) : null}
      </Col>
    </Row>
  );
};

export default WordInput;
