import './App.css';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Spinner from "react-bootstrap/Spinner";

//TODO: Adam create a very simple UI for the game and testing the backend 
import Header from './components/Header'
import Footer from './components/Footer'
import WordInput from './components/WordInput'
import GuessesDisplay from './components/GuessesDisplay';

function App() {


  let isLoading=false;
  if (isLoading)  {
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  }
  
return (
  <Container className="d-flex min-vh-100 flex-column"
  style={{ maxWidth: "90%" }}>
    <Header />
    <GuessesDisplay />
    <WordInput />
    <Footer />
  </Container>
);
}

export default App;
