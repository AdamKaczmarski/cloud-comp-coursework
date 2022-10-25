import { useDispatch, useSelector } from "react-redux";
import { setGuesses } from "../store/guessesReducer";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

const WordInput = () => {
  const dispatch = useDispatch();
  const chosenLength = useSelector((state) => state.chosenWord.chosenLength);
  console.log(chosenLength);
  const guessHandler = (ev) => {
    if (
      (ev.charCode === 13 || ev.code === "Enter") &&
      ev.target.value.length === chosenLength
    ) {
      console.log(ev.target.value);
      dispatch(setGuesses(ev.target.value));
      ev.target.value = "";
    }
  };
  return (
    <Row className="justify-content-md-center">
      <Col md="auto">
        <Form onSubmit={(ev) => ev.preventDefault()}>
          <Form.Group className="mb-3" controlId="chooseWord">
            <Form.Label className="text-muted">
              Press enter to confirm your guess
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Guess the word"
              onKeyPress={guessHandler}
            />
          </Form.Group>
        </Form>
      </Col>
    </Row>
  );
};

export default WordInput;
