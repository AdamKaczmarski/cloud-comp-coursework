import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Spinner from "react-bootstrap/Spinner";

import Header from "./components/Header";
import Footer from "./components/Footer";
import WordInput from "./components/WordInput";
import GuessesDisplay from "./components/GuessesDisplay";

import { fetchChosenWordInfo } from "./store/chosenWordReducer";

function App() {
  let isLoading = false;
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  useEffect(() => {
    if (token ) {
      const fetchLengthTrigger = async () => {
        await dispatch(fetchChosenWordInfo(token));
      };
      fetchLengthTrigger();
    }
  }, [token]);
  if (isLoading) {
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  }
  return (
    <Container
      className="d-flex min-vh-100 flex-column"
      style={{ maxWidth: "90%" }}
    >
      <Header />
      {token ? (
        <>
          <GuessesDisplay />
          <WordInput />
        </>
      ) : (
        <p>Please log in</p>
      )}
      <h1>READ COOKIE IF WON THEN DISPLAY CONGRATS</h1>
        <h1>AND SECURE THE BACKEND T SOMEHOW MAYBE FROM DELETING THE COOKIE AND PLAYING AGAIN CHECK THE LAST PLAUYED</h1>
        <h1>REGISTRATION</h1>
      <Footer />
    </Container>
  );
}

export default App;
