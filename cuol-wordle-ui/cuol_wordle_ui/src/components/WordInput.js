import { useState, useEffect} from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setGuesses} from "../store/guessesReducer";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

const WordInput = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
    const email = useSelector((state)=>state.guesses.email)
  const [isWin, setIsWin] = useState(false);
  const chosenLength = useSelector((state) => state.chosenWord.chosenLength);
  const guessesDoneLength = useSelector(
    (state) => state.guesses.guessesDone.length
  );
useEffect(()=>{
    //I love JS
    const winDateCookie = document.cookie.split(';').filter(c=>c.trim().split('=')[0]==="cuolWordleWin").shift()
    const winEmailCookie = document.cookie.split(';').filter(c=>c.trim().split('=')[0]==="cuolWordleWinEmail").shift()
    if (winDateCookie){
        const cookieEmail = winEmailCookie.trim().split('=')[1]
        const cookieDate = new Date(+winDateCookie.trim().split('=')[1]);
        const todayDate = new Date()
        if (cookieDate.setHours(0,0,0,0)===todayDate.setHours(0,0,0,0) && cookieEmail===email){
            setIsWin(true)
        }
    }
},[])
  const guessHandler = async (ev) => {
    if (
      (ev.charCode === 13 || ev.code === "Enter") &&
      ev.target.value.length === chosenLength
    ) {
      if (guessesDoneLength < chosenLength) {
        //HERE WE CHECK WITH THE SERVER WHETHER THE GUESS IS CORRECT
        // WE SAVE THE RESPONSE FROM THE SERVER IN THE REDUX STORE
        const userGuess = ev.target.value.toUpperCase();
        const url = process.env.REACT_APP_SERVER_URL;
        try {
          const response = await axios({
            method: "POST",
            url: `${url}/cuol_wordle/check_chosen`,
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
            document.cookie = `cuolWordleWinEmail=${email}`
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
        ) : null}{isWin?(
            
          <h3 className="text-center">CONGRATS!!</h3>
        ):null}
      {guessesDoneLength === chosenLength && !isWin ? <h3 className="text-center">That's a lose, try again tomorrow!</h3>:null}
      </Col>
    </Row>
  );
};

export default WordInput;
